import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryProduct} from '../models/category-product';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Product} from '../models/product';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsMulti = {
  headers: new HttpHeaders({
    'Accept': 'multipart/form-data; boundary'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listCategory: CategoryProduct[];
  listCategoryForSelect: CategoryProduct[];

  listProduct: Product[];

  constructor(private http: HttpClient, private router: Router) {
  }

  getAllCategory(): Observable<CategoryProduct[]> {
    return this.http.get(environment.apiUrl + '/category-product', httpOptions)
      .pipe(map(res => {
        this.listCategory = [].slice.call(res);
        return this.listCategory = this.listCategory.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            number: data.number,
            product: data.product.map(function (product: any) {
              return {
                id: product._id,
                name: product.name,
                image: product.image,
                info: product.info,
                price: product.price,
                quantity: product.quantity,
                flActive: product.flActive,
                number: product.number,
                category: product.category
              };
            })
          };
        });
      }));
  }

  getCategory(): Observable<CategoryProduct[]> {
    return this.http.get(environment.apiUrl + '/category-product-list', httpOptions)
      .pipe(map(res => {
        this.listCategoryForSelect = [].slice.call(res);
        return this.listCategoryForSelect = this.listCategoryForSelect.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            product: data.product,
            number: data.number,
          };
        });
      }));
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get(environment.apiUrl + '/product', httpOptions)
      .pipe(map(res => {
        this.listProduct = [].slice.call(res);
        return this.listProduct = this.listProduct.map(function (product: any) {
          return {
            id: product._id,
            name: product.name,
            image: product.image,
            info: product.info,
            price: product.price,
            quantity: product.quantity,
            flActive: product.flActive,
            category: product.category,
            number: product.number
          };
        });
      }));
  }

  postProduct(product: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + '/product', product, httpOptionsMulti);
  }

  putProduct(product: FormData): Observable<any> {
    return this.http.put(environment.apiUrl + '/product', product, httpOptionsMulti);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/product/' + id, httpOptions);
  }

  postCategory(category: CategoryProduct): Observable<any> {
    return this.http.post(environment.apiUrl + '/category-product', JSON.stringify(category), httpOptions);
  }

  putCategory(category: CategoryProduct): Observable<any> {
    return this.http.put(environment.apiUrl + '/category-product', JSON.stringify(category), httpOptions);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/category-product/' + id, httpOptions);
  }

  putProductMany(product: Product[]): Observable<any> {
    return this.http.put(environment.apiUrl + '/product/all', JSON.stringify(product), httpOptions);
  }

  getByIdProduct(id: string) {
    let product: Product;

    for (let i = 0; this.listCategory.length > i; i++) {
      if (this.listCategory[i].product.find(x => x.id === id)) {
        product = this.listCategory[i].product.find(x => x.id === id);
      }
    }
    return product;
  }
}
