import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../models/category-service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Service} from '../models/service';

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
export class ServiceService {

  listCategory: CategoryService[] = [];
  listService: Service[] = [];
  constructor(private http: HttpClient) {
  }

  getCategoryService(): Observable<CategoryService[]> {
    return this.http.get(environment.apiUrl + '/category', httpOptions)
      .pipe(map(res => {
        this.listCategory = [].slice.call(res);
        return this.listCategory = this.listCategory.map(function (category: any) {
          return {
            id: category._id,
            name: category.name,
            service: category.service.map(function (service: any) {
              return {
                id: service._id,
                name: service.name,
                price: service.price,
                info: service.info,
                image: service.image,
                category: service.category,
                flActive: service.flActive
              };
            })
          };
        });
      }));
  }

  getAllService(): Observable<Service[]> {
    return this.http.get(environment.apiUrl + '/service', httpOptions)
      .pipe(map(res => {
        this.listService = [].slice.call(res);
        return this.listService = this.listService.map(function (service: any) {
          return {
            id: service._id,
            name: service.name,
            price: service.price,
            info: service.info,
            image: service.image,
            category: service.category,
            flActive: service.flActive
          };
        });
      }));
  }

  postCategory(category: CategoryService): Observable<any> {
    return this.http.post(environment.apiUrl + '/category', JSON.stringify(category), httpOptions);
  }

  putCategory(category: CategoryService): Observable<any> {
    return this.http.put(environment.apiUrl + '/category', JSON.stringify(category), httpOptions);
  }

  postService(service: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + '/service', service, httpOptionsMulti);
  }

  putService(service: FormData): Observable<any> {
    return this.http.put(environment.apiUrl + '/service', service, httpOptionsMulti);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/category/' + id);
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/service/' + id);
  }

}
