import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {CategoryService} from '../../../models/category-service';
import {Service} from '../../../models/service';
import {MainService} from '../../../services/main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  listService: Service[] = [];
  listCategory: CategoryService[] = [];
  itemCategory: CategoryService = new CategoryService();

  searchStr: string;

  constructor(private service: ServiceService, private main: MainService, private router: Router) {
  }

  ngOnInit() {
    this.getListCategory();
    this.getListService();
  }

  getListCategory() {
    this.service.getCategoryService().subscribe(res => {
      this.listCategory = res;
      if (!this.main.itemCategory) {
        this.itemCategory = this.listCategory[0];
      } else {
        this.itemCategory = this.main.itemCategory;
      }
    });
  }

  getListService() {
    this.service.getAllService().subscribe(res => {
      this.listService = res;
    });
  }

  setCategory(category: CategoryService) {
    this.searchStr = '';
    this.itemCategory = category;
    this.main.itemCategory = category;
  }

  setService(service: Service) {
    this.main.itemService = service;
    this.router.navigate(['main', 'order']);
  }
}
