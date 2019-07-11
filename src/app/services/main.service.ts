import {Injectable} from '@angular/core';
import {CategoryService} from '../models/category-service';
import {Service} from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  itemCategory: CategoryService;
  itemService: Service;

  telephone: string = localStorage.getItem('telephone');
  constructor() {
  }
}
