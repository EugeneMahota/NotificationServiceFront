import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfirmService} from '../../services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  animations: [
    trigger('confirm', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),

      transition('void=>*, *=>void', animate('200ms ease-in-out'))
    ])
  ]
})
export class ConfirmComponent implements OnInit {

  confirm = {title: '', message: ''};

  constructor(private confirmService: ConfirmService) {
    this.confirmService.confirmEvent.subscribe(res => {
      this.confirm = res;
    });
  }

  ngOnInit() {
  }

  setConfirm(status) {
    this.confirmService.setConfirm(status);
  }

}
