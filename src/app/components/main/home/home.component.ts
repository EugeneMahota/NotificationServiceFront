import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formRequest: FormGroup;
  listCategory: CategoryService[];
  activeCategory: CategoryService;

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private alert: AlertService,
              private ws: WsService,
              private router: Router,
              private serviceService: ServiceService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.initFormRequest();
    this.getCategory();
  }

  initFormRequest() {
    this.formRequest = this.fb.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      info: ['', []]
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

  getCategory() {
    this.serviceService.getCategoryService().subscribe(res => {
      this.listCategory = res;
    });
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

}
