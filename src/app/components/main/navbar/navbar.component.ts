import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showOrder: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.urlAfterRedirects === '/main/order') {
          this.showOrder = true;
        } else {
          this.showOrder = false;
        }
      }
    });
  }

  ngOnInit() {
  }

}
