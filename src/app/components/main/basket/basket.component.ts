import {Component, OnInit} from '@angular/core';
import {MainService} from '../../../services/main.service';
import {Product} from '../../../models/product';
import {ConfirmService} from '../../../services/confirm.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SaleService} from '../../../services/sale.service';
import {AlertService} from '../../../services/alert.service';
import {AddressService} from '../../../services/address.service';
import {Address} from '../../../models/address';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  listBasket: Product[];
  totalBasket: number;

  formSale: FormGroup;
  listAddress: Address[];

  constructor(private mainService: MainService,
              private confirm: ConfirmService,
              private router: Router,
              private alert: AlertService,
              private saleService: SaleService,
              private addressService: AddressService,
              private fb: FormBuilder) {
    this.mainService.basketProductEvent.subscribe(res => {
      this.listBasket = res;
      this.totalBasket = this.listBasket.reduce((sum, value) => sum + value.price * value.quantity, 0);
      if (this.totalBasket === 0) {
        this.router.navigate(['main', 'product']);
      }
    });
  }

  ngOnInit() {
    this.listBasket = this.mainService.basketProduct;
    this.totalBasket = this.listBasket.reduce((sum, value) => sum + value.price * value.quantity, 0);

    if (this.listBasket.length === 0) {
      this.router.navigate(['main', 'product']);
    }

    this.initFromSale();
    this.getListAddress();
  }

  getListAddress() {
    this.addressService.getAll().subscribe(res => {
      this.listAddress = res;
    });
  }

  initFromSale() {
    this.formSale = this.fb.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      flPickup: [false, Validators.required],
      info: [''],
      product: []
    });
  }

  deleteProduct(id: string) {
    let confirm = this.confirm.openConfirm('Удаление из корзины', 'Вы действительно хотите удалить товар из корзины?')
      .subscribe(res => {
        if (res === true) {
          this.mainService.delBasket(id);
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  quantityPlus(product: Product) {
    product.quantity++;
    this.mainService.setBasket(this.listBasket);
  }

  quantityMinus(product: Product) {
    if (product.quantity !== 1) {
      product.quantity--;
    }
    this.mainService.setBasket(this.listBasket);
  }

  createSale() {
    if (this.listBasket.length > 0) {
      this.formSale.controls['product'].setValue(this.listBasket);

      if (this.formSale.value.flPickup === false) {
        this.formSale.controls['address'].setValue('г Краснодар ' + this.formSale.value.address);
      }

      this.saleService.postSale(this.formSale.value).subscribe(res => {
        if (res.status === 'Ok') {

          this.mainService.setBasket([]);
          this.mainService.telephone = this.formSale.value.telephone;
          this.router.navigate(['main', 'profile']);
        }
      });
    } else {
      this.alert.onAlertList('error', 'Ошибка.', 'Заказ пуст.');
    }
  }

  clearAddress(event) {
    this.formSale.controls['address'].setValue('');
  }
}
