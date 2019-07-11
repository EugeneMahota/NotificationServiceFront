import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {MainService} from '../../../services/main.service';
import {Service} from '../../../models/service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Order} from '../../../models/order';
import {WsService} from '../../../services/ws.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  itemService: Service = new Service();

  formOrder: FormGroup;

  constructor(private main: MainService,
              private router: Router,
              private fb: FormBuilder,
              private orderService: OrderService,
              private ws: WsService) {
  }

  ngOnInit() {
    if (this.main.itemService) {
      this.itemService = this.main.itemService;
    } else {
      this.router.navigate(['main', 'service']);
    }

    this.initFormOrder();
  }

  initFormOrder() {
    this.formOrder = this.fb.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      info: ['', [Validators.required]],
      status: ['new', [Validators.required]],
      service: [this.itemService.id, [Validators.required]]
    });
  }

  createOrder(order: Order) {
    this.orderService.postOrder(order).subscribe(res => {
      if (res.status === 'Ok') {
        this.main.telephone = order.telephone.toString();
        this.ws.sendMessage('addOrder', null);
        localStorage.setItem('telephone', order.telephone.toString());
        this.router.navigate(['main', 'profile']);
      }
    });
  }

}
