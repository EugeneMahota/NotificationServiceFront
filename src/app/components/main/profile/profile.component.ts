import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../services/order.service';
import {MainService} from '../../../services/main.service';
import {Order} from '../../../models/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formSearch: FormGroup;

  listOrder: Order[] = [];

  constructor(private fb: FormBuilder, private orderService: OrderService, private main: MainService) {
  }

  ngOnInit() {
    this.initFormSearch();
    if (this.main.telephone) {
      this.formSearch.controls['telephone'].setValue(this.main.telephone);
      this.getListOrder(this.main.telephone);
    }
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      telephone: ['', [Validators.required]]
    });
  }

  getListOrder(telephone: string) {
    localStorage.setItem('telephone', telephone);
    this.main.telephone = telephone;
    this.orderService.getBySearchStr(telephone).subscribe(res => {
      this.listOrder = res;
    });
  }
}
