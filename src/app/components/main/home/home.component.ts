import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../services/request.service';
import {Request} from '../../../models/request';
import {AlertService} from '../../../services/alert.service';
import {WsService} from '../../../services/ws.service';
import {Router} from '@angular/router';
import {ServiceService} from '../../../services/service.service';
import {CategoryService} from '../../../models/category-service';
import {MainService} from '../../../services/main.service';
import {Service} from '../../../models/service';
import {Section} from '../../../models/section';
import {SectionService} from '../../../services/section.service';
import {ConfigService} from '../../../services/config.service';
import {ConfigApp} from '../../../models/configApp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listSection: Section[];
  itemSection: Section = new Section();

  formRequest: FormGroup;
  listCategory: CategoryService[];
  activeCategory: CategoryService;

  itemConfig: ConfigApp;

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private alert: AlertService,
              private ws: WsService,
              private router: Router,
              private sectionService: SectionService,
              private serviceService: ServiceService,
              private mainService: MainService,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.getListSection();
    this.initFormRequest();

    this.getConfig();
  }

  initFormRequest() {
    this.formRequest = this.fb.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      info: ['', []]
    });
  }

  getListSection() {
    this.sectionService.getAll().subscribe(res => {
      this.listSection = res;
      if (!this.mainService.itemSection) {
        this.getCategory(res[0]);
        this.itemSection = res[0];
      } else {
        this.getCategory(this.mainService.itemSection);
        this.itemSection = this.mainService.itemSection;
      }
    });
  }

  getCategory(section: Section) {
    this.itemSection = section;
    this.mainService.itemSection = section;
    this.serviceService.getCategoryBySection(section).subscribe(res => {
      this.listCategory = res;
    });
  }

  createRequest(request: Request) {
    if (this.formRequest.invalid) {
      this.alert.onAlertList('error', '', 'Заполните необходимые поля!');
    } else {
      this.requestService.postRequest(request).subscribe(res => {
        if (res.status === 'Ok') {
          this.ws.sendMessage('addRequest', null);
          this.formRequest.reset();
        }
      });
    }
  }

  onNav(nav: string) {
    this.router.navigate(['main', nav]);
  }

  setCategory(category: CategoryService) {
    this.mainService.itemCategory = category;
    this.router.navigate(['main', 'service']);
  }

  setActiveCategory(category: CategoryService) {
    if (window.innerWidth > 768) {
      this.activeCategory = category;
    }
  }

  setService(service: Service) {
    this.mainService.itemService = service;
    this.router.navigate(['main', 'order']);
  }

  delService() {
    if (window.innerWidth > 768) {
      this.activeCategory = null;
    }
  }

  getConfig() {
    this.configService.getListConfig().subscribe(res => {
      this.itemConfig = res[0];
    });
  }

}
