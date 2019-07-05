import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {CategoryService} from '../../../models/category-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../../models/service';
import {ConfirmService} from '../../../services/confirm.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss']
})
export class ListServiceComponent implements OnInit {

  listCategory: CategoryService[] = [];
  formCategory: FormGroup;
  formService: FormGroup;

  image: File;
  @ViewChild('image') imageInput: ElementRef;

  itemService: Service;
  itemCategory: CategoryService;
  @ViewChild('categoryUpdate') categoryUpdate: ElementRef;

  constructor(private serviceService: ServiceService,
              private fb: FormBuilder,
              private confirm: ConfirmService) {
  }

  ngOnInit() {
    this.getListCategory();
    this.initFormCategory();
    this.initFormService();
  }

  getListCategory() {
    this.serviceService.getCategoryService().subscribe(res => {
      this.listCategory = res;
    });
  }

  initFormCategory() {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  initFormService() {
    this.formService = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      info: ['', []],
      category: ['', [Validators.required]]
    });
  }

  createCategory(category: CategoryService) {
    this.serviceService.postCategory(category).subscribe(res => {
      this.getListCategory();
    });
  }

  deleteCategory(id: string) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы действительно хотите удалить категорию?')
      .subscribe(res => {
        if (res === true) {
          this.serviceService.deleteCategory(id).subscribe(res => {
            this.getListCategory();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  deleteService(id: string) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы действительно хотите удалить услугу?')
      .subscribe(res => {
        if (res === true) {
          this.serviceService.deleteService(id).subscribe(res => {
            this.getListCategory();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  selectImage(image: any) {
    let file: File;
    file = image.target.files.item(0);
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      this.image = image.target.files.item(0);
    } else {
      this.imageInput.nativeElement.value = null;
      this.image = null;
    }
  }

  createService(service: Service) {
    const serviceData: FormData = new FormData();
    serviceData.append('name', service.name);
    serviceData.append('price', service.price.toString());
    serviceData.append('info', service.info);
    serviceData.append('category', service.category);
    serviceData.append('image', this.image);

    this.serviceService.postService(serviceData).subscribe(res => {
      this.getListCategory();
    });
  }

  updateService(service: Service) {
    const serviceData: FormData = new FormData();
    serviceData.append('id', service.id);
    serviceData.append('name', service.name);
    serviceData.append('price', service.price.toString());
    serviceData.append('info', service.info);
    serviceData.append('category', service.category);
    if (this.image) {
      serviceData.append('image', this.image);
    }
    this.serviceService.putService(serviceData).subscribe(res => {
      this.itemService = null;
      this.getListCategory();
    });
  }

  focusCategoryUpdate(category: CategoryService) {
    this.itemCategory = category;
    setTimeout(() => {
      this.categoryUpdate.nativeElement.focus();
    }, 0);
  }

  closeCategoryUpdate() {
    this.itemCategory = null;
  }

  updateCategory(category: CategoryService) {
    console.log({id: category.id, name: category.name});
    this.serviceService.putCategory({id: category.id, name: category.name, service: []}).subscribe(res => {
      this.getListCategory();
      this.itemCategory = null;
    });
  }
}
