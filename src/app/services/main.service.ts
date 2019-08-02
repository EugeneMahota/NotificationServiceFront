import {Injectable} from '@angular/core';
import {CategoryService} from '../models/category-service';
import {Service} from '../models/service';
import {CategoryProduct} from '../models/category-product';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  itemCategory: CategoryService;
  itemService: Service;

  itemCategoryProduct: CategoryProduct;

  telephone: string = localStorage.getItem('telephone');

  constructor() {
  }
}
