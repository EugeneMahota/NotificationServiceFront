import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {Order} from '../../../models/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmService} from '../../../services/confirm.service';
import {WsService} from '../../../services/ws.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  listOrder: Order[] = [];
  activePeriod: string;
  activeStatus: string;

  formSearch: FormGroup;

  constructor(private orderService: OrderService,
              private fb: FormBuilder,
              private confirm: ConfirmService,
              private ws: WsService) {
  }

  ngOnInit() {
    this.activeStatus = 'all';
    this.activePeriod = this.orderService.activePeriod;
    this.getOrderForPeriod();

    this.initFormSearch();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      searchStr: ['', [Validators.required]]
    });
  }

  getOrderForPeriod() {
    if (this.activePeriod === 'day') {
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'yesterday') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateEnd.setDate(date.getDate());
      dateStart.setDate(date.getDate() - 1);

      dateEnd.setHours(0);
      dateEnd.setMinutes(0);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'week') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateStart.setDate(date.getDate() - 6);

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'month') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateStart.setDate(date.getDate() - 30);

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'all') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateStart.setFullYear(date.getFullYear() - 10);

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }
  }

  getListOrder(dateStart, dateEnd) {
    this.orderService.getAll(dateStart, dateEnd, this.activePeriod).subscribe(res => {
      this.listOrder = res;
    });
  }

  setActivePeriod(period) {
    this.activePeriod = period;
    this.getOrderForPeriod();
  }

  updateStatusOrder(id: string, status: string) {
    this.orderService.putOrder(id, status).subscribe(res => {
      if (res.status === 'Ok') {
        this.ws.sendMessage('checkOrder', null);
        this.getOrderForPeriod();
      }
    });
  }

  deleteOrder(id: string) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы дейсвительно хотите удалить заказ?')
      .subscribe(res => {
        if (res === true) {
          this.orderService.deleteOrder(id).subscribe(res => {
            this.getOrderForPeriod();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  searchOrder(data) {
    this.orderService.getBySearchStr(data.searchStr).subscribe(res => {
      this.listOrder = res;
    });
  }
}
