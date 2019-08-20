import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MainService} from '../../../services/main.service';
import {Product} from '../../../models/product';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfigService} from '../../../services/config.service';
import {ConfigApp} from '../../../models/configApp';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('pulse', [
      state('void', style({
        boxShadow: '0 0 0 0px rgba(21, 101, 192, 1)'
      })),
      state('*', style({
        boxShadow: '0 0 0 80px rgba(21, 101, 192, 0.0)'
      })),
      transition('void=>*', animate(600))
    ]),

    trigger('nav', [
      state('void', style({
        transform: 'translateY(-100%)'
      })),
      state('*', style({
        transform: 'translateY(0)'
      })),
      transition('void=>*, *=>void', animate(200))
    ])
  ]
})
export class NavbarComponent implements OnInit {

  showNavbar: boolean;
  showOrder: boolean;
  showBasket: boolean;

  animatePulse: boolean = false;

  @ViewChild('btnMenu', {static: false}) btnMenu;
  @ViewChild('btnMenuFixed', {static: false}) btnMenuFixed;

  listBasket: Product[] = [];
  totalBasket: number;

  heightToTop: number;

  itemConfig: ConfigApp;

  constructor(private router: Router, private mainService: MainService, private configService: ConfigService) {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.urlAfterRedirects === '/main/order') {
          this.showOrder = true;
        } else {
          this.showOrder = false;
        }

        if (res.urlAfterRedirects === '/main/basket') {
          this.showBasket = true;
        } else {
          this.showBasket = false;
        }

        if (res.urlAfterRedirects === '/main/feedback') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      }
    });
  }

  ngOnInit() {
    this.listBasket = this.mainService.basketProduct;
    this.totalBasket = this.listBasket.reduce((sum, value) => sum + value.price * value.quantity, 0);
    this.basketAnimateOn();

    this.mainService.basketProductEvent.subscribe(res => {
      this.listBasket = res;
      this.totalBasket = this.listBasket.reduce((sum, value) => sum + value.price * value.quantity, 0);
      this.basketAnimateOn();
    });

    this.getConfig();
  }

  hideMenu() {
    if (window.innerWidth < 992) {
      this.btnMenu.nativeElement.click();
    }
  }

  hideMenuFixed() {
    if (window.innerWidth < 992) {
      this.btnMenuFixed.nativeElement.click();
    }
  }


  basketAnimateOn() {
    this.animatePulse = false;
    setTimeout(() => {
      this.animatePulse = true;
    }, 600);
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.heightToTop = document.documentElement.scrollTop;
  }

  getConfig() {
    this.configService.getListConfig().subscribe(res => {
      this.itemConfig = res[0];
    });
  }
}
