import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alert', [
      state('void', style({
        marginRight: '-228px'
      })),
      state('*', style({
        marginRight: 0
      })),

      transition('void=>*, *=>void', animate('200ms ease-in-out'))
    ])
  ]
})
export class AlertComponent implements OnInit {

  listAlert: any[] = [];

  constructor(private alertService: AlertService) {
    this.alertService.listAlertEvent.subscribe(res => {
      this.listAlert = res;
    });
  }

  ngOnInit() {
  }

  delAlert(alert) {
    this.alertService.delAlertItem();
  }

}
