import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {CategoryService} from '../../../models/category-service';
import {Service} from '../../../models/service';
import {MainService} from '../../../services/main.service';
import {Router} from '@angular/router';
import {OrderService} from '../../../services/order.service';
import {WsService} from '../../../services/ws.service';
import {Section} from '../../../models/section';
import {SectionService} from '../../../services/section.service';

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

  listSection: Section[];
  itemSection: Section;

  searchStr: string;

  quantityCategory: number = 4;
  @ViewChild('blockService', {static: true}) blockService: ElementRef;

  constructor(private service: ServiceService,
              private main: MainService,
              private router: Router,
              private sectionService: SectionService) {
  }

  ngOnInit() {
    this.getListCategory();
    this.getListService();
    this.getListSection();
  }

  getListCategory() {
    this.service.getCategoryService().subscribe(res => {
      this.listCategory = res;
      if (!this.main.itemCategory) {
        this.itemCategory = this.listCategory[0];
      } else {
        this.itemCategory = this.listCategory.find(x => x.id === this.main.itemCategory.id);
        if (window.innerWidth < 991) {
          setTimeout(() => {
            this.blockService.nativeElement.scrollIntoView({behavior: 'smooth', inline: 'start'});
          }, 500);
        }
      }
    });
  }

  getListService() {
    this.service.getAllService().subscribe(res => {
      this.listService = res;
    });
  }

  getListSection() {
    this.sectionService.getAll().subscribe(res => {
      this.listSection = res;
    });
  }

  setCategory(category: CategoryService) {
    this.searchStr = '';
    this.itemCategory = category;
    this.main.itemCategory = category;
    setTimeout(() => {
      this.blockService.nativeElement.scrollIntoView({behavior: 'smooth', inline: 'start'});
    }, 500);
  }

  setService(service: Service) {
    this.main.itemService = service;
    this.router.navigate(['main', 'order']);
  }
}
