import {Component, OnInit} from '@angular/core';
import {CategoryProduct} from '../../../models/category-product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id: string;
  listCategory: CategoryProduct[];
  formProduct: FormGroup;

  image: File;

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    let product: Product = this.productService.getByIdProduct(this.id);

    this.getListCategory();
    this.initFormProduct(product);
  }

  initFormProduct(product) {
    this.formProduct = this.fb.group({
      id: [product.id, [Validators.required]],
      name: [product.name, [Validators.required]],
      info: [product.info, [Validators.required]],
      price: [product.price, [Validators.required]],
      quantity: [product.quantity, [Validators.required]],
      category: [product.category, [Validators.required]],
      flActive: [product.flActive, [Validators.required]]
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

  updateProduct(product: Product) {
    const dataProduct: FormData = new FormData();

    dataProduct.append('id', product.id);
    dataProduct.append('name', product.name);
    dataProduct.append('info', product.info);
    dataProduct.append('price', product.price.toString());
    dataProduct.append('quantity', product.quantity.toString());
    dataProduct.append('category', product.category);
    dataProduct.append('flActive', product.flActive.toString());
    if (this.image) {
      dataProduct.append('image', this.image);
    }

    this.productService.putProduct(dataProduct).subscribe(res => {
      if (res.status === 'Ok') {
        this.router.navigate(['dashboard', 'product']);
      }
    });
  }
}
