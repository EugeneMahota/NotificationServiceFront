import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryProduct} from '../../../models/category-product';
import {SaleService} from '../../../services/sale.service';
import {Router} from '@angular/router';
import {ConfirmService} from '../../../services/confirm.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  listProduct: CategoryProduct[];
  listSaleProduct: Product[] = [];
  totalSale: number = 0;

  formSale: FormGroup;

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private saleService: SaleService,
              private router: Router,
              private confirm: ConfirmService) {
  }

  ngOnInit() {
    this.initFormSale();
    this.getListProduct();
  }

  initFormSale() {
    this.formSale = this.fb.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      info: [''],
      product: ['', Validators.required],
    });
  }

  getListProduct() {
    this.productService.getAllCategory().subscribe(res => {
      this.listProduct = res;
    });
  }

  addProduct(product: Product) {
    let findProduct: Product = this.listSaleProduct.find(x => x.id === product.id);

    if (findProduct) {
      findProduct.quantity = +findProduct.quantity + 1;
    } else {
      this.listSaleProduct.push({
        id: product.id,
        name: product.name,
        image: product.image,
        info: product.info,
        price: product.price,
        quantity: 1,
        category: product.category,
        flActive: product.flActive,
        number: product.number
      });
    }
    this.updateTotal();
  }

  deleteProduct(prdouct: Product) {
    let confirm = this.confirm.openConfirm('Удаление из корзины', 'Вы действительно хотите удалит продукт: ' + prdouct.name + '?')
      .subscribe(res => {
        if (res === true) {
          this.listSaleProduct.splice(this.listSaleProduct.indexOf(prdouct), 1);
          this.updateTotal();
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  updateTotal() {
    this.formSale.controls['product'].setValue(this.listSaleProduct);
    this.totalSale = this.listSaleProduct.reduce((sum, value) => sum + value.price * value.quantity, 0);
  }

  createSale() {
    this.formSale.controls['product'].setValue(this.listSaleProduct);

    this.saleService.postSale(this.formSale.value).subscribe(res => {
      if (res.status === 'Ok') {
        this.router.navigate(['dashboard', 'sale']);
      }
    });
  }

}
