import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfirmService} from '../../services/confirm.service';
import {DOCUMENT} from '@angular/common';

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

  constructor(private confirmService: ConfirmService,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {
    this.confirmService.confirmEvent.subscribe(res => {
      this.confirm = res;

      if (this.confirm.title) {
        this.renderer.addClass(this.document.body, 'modal-show');
      } else {
        this.renderer.removeClass(this.document.body, 'modal-show');
      }
    });
  }

  ngOnInit() {
  }

  setConfirm(status) {
    this.confirmService.setConfirm(status);
  }

}
