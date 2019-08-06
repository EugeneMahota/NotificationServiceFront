import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MainService} from '../../../services/main.service';
import {Product} from '../../../models/product';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('pulse', [
      state('void', style({
        boxShadow: '0 0 0 0px rgba(236, 64, 122, 1)'
      })),
      state('*', style({
        boxShadow: '0 0 0 80px rgba(236, 64, 122, 0.0)'
      })),
      transition('void=>*', animate(600))
    ])
  ]
})
export class NavbarComponent implements OnInit {

  showNavbar: boolean;
  showOrder: boolean;
  showBasket: boolean;

  animatePulse: boolean = false;

  @ViewChild('btnMenu') btnMenu;

  listBasket: Product[] = [];
  totalBasket: number;

  constructor(private router: Router, private mainService: MainService) {
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
  }

  hideMenu() {
    if (window.innerWidth < 992) {
      this.btnMenu.nativeElement.click();
    }
  }


  basketAnimateOn() {
    this.animatePulse = false;
    setTimeout(() => {
      this.animatePulse = true;
    }, 600);
  }
}
