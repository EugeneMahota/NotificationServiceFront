import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../services/order.service';
import {MainService} from '../../../services/main.service';
import {Order} from '../../../models/order';
import {Sale} from '../../../models/sale';
import {SaleService} from '../../../services/sale.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formSearch: FormGroup;

  listOrder: Order[] = [];
  listSale: Sale[] = [];
  constructor(private fb: FormBuilder,
              private orderService: OrderService,
              private main: MainService,
              private saleService: SaleService) {
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
    if (telephone) {
      localStorage.setItem('telephone', telephone);
      this.main.telephone = telephone;
      this.orderService.getBySearchStr(telephone).subscribe(res => {
        this.listOrder = res;
      });

      this.saleService.getSaleByTelephone(telephone).subscribe(res => {
        this.listSale = res;
      });
    }
  }
}
