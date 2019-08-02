import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showNavbar: boolean;
  showOrder: boolean;

  @ViewChild('btnMenu') btnMenu;

  constructor(private router: Router) {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.urlAfterRedirects === '/main/order') {
          this.showOrder = true;
        } else {
          this.showOrder = false;
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
  }

  hideMenu() {
    if (window.innerWidth < 992) {
      this.btnMenu.nativeElement.click();
    }
  }
}
