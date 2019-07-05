import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../models/order';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  listOrder: Order[] = [];

  activePeriod: string = 'day';
  constructor(private http: HttpClient) {
  }

  getAll(dateStart: Date, dateEnd: Date, activePeriod: string): Observable<Order[]> {
    this.activePeriod = activePeriod;
    return this.http.get(environment.apiUrl + '/order',
      {params: {dateStart: dateStart.toString(), dateEnd: dateEnd.toString()}})
      .pipe(map(res => {
        this.listOrder = [].slice.call(res);
        return this.listOrder = this.listOrder.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            telephone: data.telephone,
            date: data.date,
            status: data.status,
            service: {
              id: data.service._id,
              name: data.service.name,
              price: data.service.price,
              info: data.service.info,
              image: data.service.image,
              category: data.service.category
            },
            info: data.info
          };
        });
      }));
  }

  getBySearchStr(searchStr: string): Observable<Order[]> {
    return this.http.get(environment.apiUrl + '/order/' + searchStr)
      .pipe(map(res => {
        this.listOrder = [].slice.call(res);
        return this.listOrder = this.listOrder.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            telephone: data.telephone,
            date: data.date,
            status: data.status,
            service: {
              id: data.service._id,
              name: data.service.name,
              price: data.service.price,
              info: data.service.info,
              image: data.service.image,
              category: data.service.category
            },
            info: data.info
          };
        });
      }));
  }

  postOrder(order: Order): Observable<any> {
    return this.http.post(environment.apiUrl + '/order', JSON.stringify(order), httpOptions);
  }

  putOrder(id: string, status: string): Observable<any> {
    return this.http.put(environment.apiUrl + '/order', JSON.stringify({id: id, status: status}), httpOptions);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/order/' + id, httpOptions);
  }
}
