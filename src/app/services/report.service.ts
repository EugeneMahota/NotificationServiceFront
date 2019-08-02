import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportOrder: Order[] = [];

  constructor(private http: HttpClient) {
  }

  getReportOrder(dateStart: Date, dateEnd: Date): Observable<Order[]> {
    return this.http.get(environment.apiUrl + '/report', {params: {dateStart: dateStart.toString(), dateEnd: dateEnd.toString()}})
      .pipe(map(res => {
        this.reportOrder = [].slice.call(res);
        return this.reportOrder = this.reportOrder.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            telephone: data.telephone,
            date: data.date,
            status: data.status,
            service: data.service,
            info: data.info,
            price: data.price
          };
        });
      }));
  }
}
