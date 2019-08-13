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

  listOrder: Order[];
  itemOrder: Order = new Order();

  activePeriod: string;
  activeStatus: string;
  formOrder: FormGroup;

  constructor(private orderService: OrderService,
              private fb: FormBuilder,
              private confirm: ConfirmService,
              private ws: WsService) {
  }

  ngOnInit() {
    this.activeStatus = 'all';
    this.activePeriod = this.orderService.activePeriod;
    this.getOrderForPeriod();

    this.initFormPrice();
  }

  initFormPrice() {
    this.formOrder = this.fb.group({
      price: [''],
      comment: [''],
      dateCompleted: ['']
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
    this.orderService.putStatusOrder(id, status).subscribe(res => {
      if (res.status === 'Ok') {
        this.ws.sendMessage('checkOrder', null);
        this.getOrderForPeriod();
      }
    });
  }


  setEditOrder(order: Order) {
    this.itemOrder = order;
    this.formOrder.controls['price'].setValue(order.price);
    this.formOrder.controls['comment'].setValue(order.comment);
    this.formOrder.controls['dateCompleted'].setValue(order.dateCompleted);
  }

  updateOrder(order: Order) {
    this.orderService.putOrder(this.itemOrder.id, order.price, order.comment, order.dateCompleted).subscribe(res => {
      if (res.status === 'Ok') {
        this.getOrderForPeriod();
        this.formOrder.reset();
      }
    });
  }

  deleteOrder(id: string) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы дейсвительно хотите удалить заказ?')
      .subscribe(res => {
        if (res === true) {
          this.orderService.deleteOrder(id).subscribe(res => {
            this.getOrderForPeriod();
            this.ws.sendMessage('checkOrder', null);
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }
}
