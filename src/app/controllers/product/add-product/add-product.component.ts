import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {CategoryProduct} from '../../../models/category-product';
import {Product} from '../../../models/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  listCategory: CategoryProduct[];
  formProduct: FormGroup;

  image: File;

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.getListCategory();
    this.initFormProduct();
  }

  initFormProduct() {
    this.formProduct = this.fb.group({
      name: ['', [Validators.required]],
      info: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      flActive: [true, [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  getListCategory() {
    this.productService.getCategory().subscribe(res => {
      this.listCategory = res;
    });
  }

  selectImage(event) {
    this.image = event.target.files.item(0);
  }

  createProduct(product: Product) {
    const dataProduct: FormData = new FormData();

    dataProduct.append('name', product.name);
    dataProduct.append('info', product.info);
    dataProduct.append('price', product.price.toString());
    dataProduct.append('quantity', product.quantity.toString());
    dataProduct.append('category', product.category);
    dataProduct.append('flActive', product.flActive.toString());
    dataProduct.append('number', product.number.toString());
    dataProduct.append('image', this.image);

    this.productService.postProduct(dataProduct).subscribe(res => {
      if (res.status === 'Ok') {
        this.router.navigate(['dashboard', 'product']);
      }
    });
  }

}
