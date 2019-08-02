import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CategoryProduct} from '../../models/category-product';
import {ConfirmService} from '../../services/confirm.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  listProduct: CategoryProduct[];
  formCategory: FormGroup;
  formCategoryEdit: FormGroup;

  constructor(private productService: ProductService,
              private confirm: ConfirmService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getAllProduct();
    this.initFormCategory();
    this.initFormCategoryEdit();
  }

  initFormCategory() {
    this.formCategory = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  initFormCategoryEdit() {
    this.formCategoryEdit = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  getAllProduct() {
    this.productService.getAllCategory().subscribe(res => {
      console.log(JSON.stringify(res));
      this.listProduct = res;
    });
  }

  deleteProduct(id: string) {
    let confirm = this.confirm.openConfirm('Удаление товара', 'Вы действительно хотите удалить товар?')
      .subscribe(res => {
        if (res === true) {
          confirm.unsubscribe();
          this.productService.deleteProduct(id).subscribe(res => {
            this.getAllProduct();
          });
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  deleteCategory(id: string) {
    let confirm = this.confirm.openConfirm('Удаление категории', 'Вы действительно хотите удалить категорию?')
      .subscribe(res => {
        if (res === true) {
          confirm.unsubscribe();
          this.productService.deleteCategory(id).subscribe(res => {
            this.getAllProduct();
          });
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  createCategory(category: CategoryProduct) {
    this.productService.postCategory(category).subscribe(res => {
      if (res.status === 'Ok') {
        this.getAllProduct();
        this.formCategory.reset();
      }
    });
  }

  setCategory(category: CategoryProduct) {
    this.formCategoryEdit.controls['id'].setValue(category.id);
    this.formCategoryEdit.controls['name'].setValue(category.name);
  }

  updateCategory(category: CategoryProduct) {
    this.productService.putCategory(category).subscribe(res => {
      if (res.status === 'Ok') {
        this.getAllProduct();
        this.formCategoryEdit.reset();
      }
    });
  }

  updateProduct(listCategory: CategoryProduct[]) {
    let listProduct: Product[] = [];

    for (let i = 0; listCategory.length > i; i++) {
      for (let j = 0; listCategory[i].product.length > j; j++) {
        listProduct.push(listCategory[i].product[j]);
      }
    }
    this.productService.putProductMany(listProduct).subscribe(res => {
      this.getAllProduct();
    });
  }
}

