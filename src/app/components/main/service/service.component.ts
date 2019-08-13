import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {CategoryService} from '../../../models/category-service';
import {Service} from '../../../models/service';
import {MainService} from '../../../services/main.service';
import {Router} from '@angular/router';
import {Order} from '../../../models/order';
import {OrderService} from '../../../services/order.service';
import {WsService} from '../../../services/ws.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  listService: Service[];
  itemService: Service = new Service();

  listCategory: CategoryService[];
  itemCategory: CategoryService = new CategoryService();

  searchStr: string;

  // @ViewChild('searchInput') searchInput;
  @ViewChild('blockCategoryScroll', { static: false }) public blockCategoryScroll: ElementRef;

  constructor(private service: ServiceService,
              private main: MainService,
              private router: Router,
              private orderService: OrderService,
              private ws: WsService) {
  }

  ngOnInit() {
    this.getListCategory();
    this.getListService();
  }

  getListCategory() {
    this.service.getCategoryService().subscribe(res => {
      this.listCategory = res;
      if (!this.main.itemCategory) {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        this.itemCategory = this.listCategory[0];
      } else {
        this.itemCategory = this.listCategory.find(x => x.id === this.main.itemCategory.id);
        setTimeout(() => {
          document.getElementById(this.itemCategory.id).scrollIntoView({behavior: 'smooth', inline: 'center'});
        }, 100);
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

  scrollPrev() {
    this.blockCategoryScroll.nativeElement.scrollTo({left: this.blockCategoryScroll.nativeElement.scrollLeft - 500, behavior: 'smooth'});
  }

  scrollNext() {
    this.blockCategoryScroll.nativeElement.scrollTo({left: this.blockCategoryScroll.nativeElement.scrollLeft + 500, behavior: 'smooth'});
  }
}
