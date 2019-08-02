import {Component, OnInit} from '@angular/core';
import {ActivationEnd, NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('page', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void=>*', animate('500ms ease-in-out'))
    ])
  ]
})
export class MainComponent implements OnInit {

  animationState: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(res => {

      if (res instanceof ActivationEnd) {
        this.animationState = true;
      }

      if (res instanceof NavigationEnd) {
        setTimeout(() => {
          this.animationState = false;
        }, 20);

        if (res.url !== '/main/service') {
          window.scroll({top: 0, left: 0, behavior: 'smooth'});
        }
      }


    });
  }

  ngOnInit() {
  }

}
