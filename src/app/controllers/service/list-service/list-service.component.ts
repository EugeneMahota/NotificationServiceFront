import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {CategoryService} from '../../../models/category-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../../models/service';
import {ConfirmService} from '../../../services/confirm.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Section} from '../../../models/section';
import {SectionService} from '../../../services/section.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.scss'],
  animations: [
    trigger('slideIn', [
      state('void', style({
        transform: 'translateX(100%)',
        position: 'absolute',
        right: 0
      })),
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('void=>*', animate('1000ms linear'))
    ])
  ]
})
export class ListServiceComponent implements OnInit {

  showForm: boolean;

  listSection: Section[];
  listCategoryForSelect: CategoryService[];
  listCategory: CategoryService[];
  formCategory: FormGroup;
  formService: FormGroup;

  image: File;
  imageForCategory: File;
  @ViewChild('image', {static: false}) imageInput: ElementRef;
  @ViewChild('imageCategory', {static: false}) imageInputCategory: ElementRef;

  itemSection: Section;
  itemService: Service;
  itemCategory: CategoryService;
  @ViewChild('categoryUpdate', {static: false}) categoryUpdate: ElementRef;

  constructor(private serviceService: ServiceService,
              private fb: FormBuilder,
              private confirm: ConfirmService,
              private sectionService: SectionService) {
  }

  ngOnInit() {
    this.showForm = false;

    this.getListCategory();
    this.getListCategoryForSelect();
    this.getListSection();

    this.initFormCategory();
    this.initFormService();
  }

  getListCategory() {
    this.serviceService.getCategoryService().subscribe(res => {
      this.listCategory = res;
    });
  }

  getListCategoryForSelect() {
    this.serviceService.getCategory().subscribe(res => {
      this.listCategoryForSelect = res;
    });
  }

  getListSection() {
    this.sectionService.getAll().subscribe(res => {
      this.listSection = res;
    });
  }

  initFormCategory() {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required]],
      section: ['', [Validators.required]]
    });
  }

  initFormService() {
    this.formService = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      info: ['', []],
      category: ['', [Validators.required]],
      flActive: ['', [Validators.required]]
    });
  }

  deleteCategory(id: string) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы действительно хотите удалить категорию?')
      .subscribe(res => {
        if (res === true) {
          this.serviceService.deleteCategory(id).subscribe(res => {
            this.getListCategory();
            this.getListCategoryForSelect();
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

  selectImageCategory(image: any) {
    let file: File;
    file = image.target.files.item(0);
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      this.imageForCategory = image.target.files.item(0);
    } else {
      this.imageInputCategory.nativeElement.value = null;
      this.imageForCategory = null;
    }
  }

  createService(service: Service) {
    const serviceData: FormData = new FormData();
    serviceData.append('name', service.name);
    serviceData.append('price', service.price.toString());
    serviceData.append('info', service.info);
    serviceData.append('category', service.category);
    serviceData.append('image', this.image);
    serviceData.append('flActive', service.flActive.toString());

    this.serviceService.postService(serviceData).subscribe(res => {
      if (res.status === 'Ok') {
        this.formService.reset();
      }
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
    serviceData.append('flActive', service.flActive.toString());
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

  createCategory(category: CategoryService) {
    const categoryData = new FormData();
    categoryData.append('name', category.name);
    categoryData.append('section', category.section);
    categoryData.append('image', this.imageForCategory);

    this.serviceService.postCategory(categoryData).subscribe(res => {
      this.getListCategoryForSelect();
      this.getListCategory();
      this.clearImage();
    });
  }

  updateCategory(category: CategoryService) {
    const categoryData = new FormData();
    categoryData.append('id', category.id);
    categoryData.append('name', category.name);
    categoryData.append('section', category.section);
    if (this.imageForCategory) {
      categoryData.append('image', this.imageForCategory);
    }

    this.serviceService.putCategory(categoryData).subscribe(res => {
      this.getListCategory();
      this.getListCategoryForSelect();
      this.itemCategory = null;
      this.clearImage();
    });
  }

  clearImage() {
    this.image = null;
    this.imageForCategory = null;
    this.imageInput.nativeElement.value = null;
    this.imageInputCategory.nativeElement.value = null;
  }
}
