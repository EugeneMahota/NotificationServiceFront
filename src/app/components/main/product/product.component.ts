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

  @ViewChild('dropDivider') dropDivider: ElementRef;

  constructor(private productService: ProductService, private mainService: MainService) {
  }

  ngOnInit() {
    this.getListProduct();
  }

  getListProduct() {
    this.productService.getAllCategory().subscribe(res => {
      if (!this.mainService.itemCategoryProduct) {
        this.listCategory = res;
        this.itemCategoryProduct = res[0];
      } else {
        this.listCategory = res;
        this.itemCategoryProduct = this.listCategory.find(x => x.id === this.mainService.itemCategoryProduct.id);
      }
    });
  }

  setCategoryProduct(category: CategoryProduct) {
    this.mainService.itemCategoryProduct = category;
    this.itemCategoryProduct = category;
    if (window.innerWidth < 991) {
      this.dropDivider.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
  }

}
