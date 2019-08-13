import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {CategoryProduct} from '../../../models/category-product';
import {Product} from '../../../models/product';
import {MainService} from '../../../services/main.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  listCategory: CategoryProduct[];
  itemCategoryProduct: CategoryProduct = new CategoryProduct();

  @ViewChild('dropDivider', {static: true}) dropDivider: ElementRef;

  listBasket: Product[] = [];

  searchStr: string;
  constructor(private productService: ProductService,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.getListProduct();

    this.listBasket = this.mainService.basketProduct;
    this.mainService.basketProductEvent.subscribe(res => {
      this.listBasket = res;
      this.editViewProduct();
    });
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(res => {
      this.listCategory.push(
        {
          id: '0101010100010',
          name: 'Все товары',
          product: res
        }
      );
      this.listCategory = this.listCategory.reverse();
      if (!this.mainService.itemCategoryProduct) {
        this.itemCategoryProduct = this.listCategory[0];
      } else {
        this.itemCategoryProduct = this.listCategory.find(x => x.id === this.mainService.itemCategoryProduct.id);
      }

      this.editViewProduct();
    });
  }

  getListProduct() {
    this.productService.getAllCategory().subscribe(res => {
      if (!this.mainService.itemCategoryProduct) {
        this.listCategory = res;
        this.getAllProduct();
      } else {
        this.listCategory = res;
        this.getAllProduct();
      }
    });
  }

  setCategoryProduct(category: CategoryProduct) {
    this.mainService.itemCategoryProduct = category;
    this.itemCategoryProduct = category;
    if (window.innerWidth < 991) {
      this.dropDivider.nativeElement.scrollIntoView({behavior: 'smooth'});
    }

    this.editViewProduct();
  }

  pushBasket(product: Product) {
    product.category = 'onBasket';

    this.mainService.pushBasket({
      id: product.id,
      name: product.name,
      image: product.image,
      info: product.info,
      price: product.price,
      quantity: 1,
      category: product.category,
      flActive: product.flActive
    });
  }

  delBasket(product: Product) {
    product.category = '';

    this.mainService.delBasket(product.id);
  }

  editViewProduct() {
    for (let i = 0; this.itemCategoryProduct.product.length > i; i++) {
      for (let j = 0; this.listBasket.length > j; j++) {
        if (this.itemCategoryProduct.product[i].id === this.listBasket[j].id) {
          this.itemCategoryProduct.product[i].category = 'onBasket';
        }
      }
    }
  }
}
