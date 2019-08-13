import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../models/category-service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Service} from '../models/service';
import {Section} from '../models/section';

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

  getCategoryBySection(section: Section): Observable<CategoryService[]> {
    return this.http.get(environment.apiUrl + '/category/' + section.id, httpOptions)
      .pipe(map(res => {
        let listCategory = [].slice.call(res);
        return listCategory = listCategory.map(function (category: any) {
          return {
            id: category._id,
            name: category.name,
            image: category.image,
            section: category.section,
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

  getCategoryService(): Observable<CategoryService[]> {
    return this.http.get(environment.apiUrl + '/category-and-service', httpOptions)
      .pipe(map(res => {
        this.listCategory = [].slice.call(res);
        return this.listCategory = this.listCategory.map(function (category: any) {
          return {
            id: category._id,
            name: category.name,
            image: category.image,
            section: category.section,
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

  getCategory(): Observable<CategoryService[]> {
    return this.http.get(environment.apiUrl + '/category', httpOptions)
      .pipe(map(res => {
        let listCategory = [].slice.call(res);
        return listCategory.map(function (category: any) {
          return {
            id: category._id,
            name: category.name,
            image: category.image,
            section: category.section,
            service: []
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

  postCategory(category: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + '/category', category, httpOptionsMulti);
  }

  putCategory(category: FormData): Observable<any> {
    return this.http.put(environment.apiUrl + '/category', category, httpOptionsMulti);
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
