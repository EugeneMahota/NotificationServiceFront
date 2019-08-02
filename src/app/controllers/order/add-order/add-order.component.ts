import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../../services/service.service';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../../models/category-service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  listCategory: CategoryService[] = [];

  formOrder: FormGroup;

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit() {
    this.initFormOrder();
    this.getListService();
  }

  initFormOrder() {
    this.formOrder = this.fb.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      status: ['new', [Validators.required]],
      service: ['', [Validators.required]],
      info: ['', []]
    });
  }

  getListService() {
    this.serviceService.getCategoryService().subscribe(res => {
      this.listCategory = res;
    });
  }

  createOrder(order: Order) {
    this.orderService.postOrder(order).subscribe(res => {
      this.router.navigate(['dashboard', 'order']);
    });
  }
}
