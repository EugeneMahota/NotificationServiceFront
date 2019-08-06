import {EventEmitter, Injectable} from '@angular/core';
import {CategoryService} from '../models/category-service';
import {Service} from '../models/service';
import {CategoryProduct} from '../models/category-product';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  itemCategory: CategoryService;
  itemService: Service;

  itemCategoryProduct: CategoryProduct;

  telephone: string = localStorage.getItem('telephone');

  basketProduct: Product[] = [];
  basketProductEvent: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  constructor() {
    if (localStorage.getItem('basket')) {
      this.basketProduct = JSON.parse(localStorage.getItem('basket'));
      this.basketProductEvent.emit(this.basketProduct);
    }
  }

  setBasket(listBasket: Product[]) {
    this.basketProduct = listBasket;
    this.basketProductEvent.emit(this.basketProduct);

    localStorage.setItem('basket', JSON.stringify(this.basketProduct));
  }

  pushBasket(product: Product) {
    let productFind: Product;
    productFind = this.basketProduct.find(x => x.id === product.id);

    if (productFind) {
      productFind.quantity++;
    } else {
      this.basketProduct.push(product);
    }

    this.basketProductEvent.emit(this.basketProduct);

    localStorage.setItem('basket', JSON.stringify(this.basketProduct));
  }

  delBasket(id: string) {
    this.basketProduct.splice(this.basketProduct.indexOf(this.basketProduct.find(x => x.id === id)), 1);
    this.basketProductEvent.emit(this.basketProduct);

    localStorage.setItem('basket', JSON.stringify(this.basketProduct));
  }
}
