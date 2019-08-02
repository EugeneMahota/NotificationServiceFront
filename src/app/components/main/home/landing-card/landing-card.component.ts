import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-card',
  templateUrl: './landing-card.component.html',
  styleUrls: ['./landing-card.component.scss']
})
export class LandingCardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onScrollTop() {
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }
}
