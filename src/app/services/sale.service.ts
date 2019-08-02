import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sale} from '../models/sale';
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
export class SaleService {

  activePeriod: string = 'day';
  listSale: Sale[];
  constructor(private http: HttpClient) {
  }

  getSaleByDate(datesStart: Date, dateEnd: Date, activePeriod): Observable<Sale[]> {
    this.activePeriod = activePeriod;
    return this.http.get(environment.apiUrl + '/sale', {params: {dateStart: datesStart.toString(), dateEnd: dateEnd.toString()}})
      .pipe(map(res => {
        this.listSale = [].slice.call(res);
        return this.listSale = this.listSale.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            telephone: data.telephone,
            info: data.info,
            status: data.status,
            date: data.date,
            sum: data.product.reduce((sum, value) => sum + value.product.price * value.quantity, 0),
            product: data.product.map(function (product: any) {
              return {
                id: product._id,
                name: product.product.name,
                image: product.product.image,
                info: product.product.info,
                price: product.product.price,
                quantity: product.quantity,
                category: product.product.category,
                flActive: product.product.flActive
              };
            })
          };
        });
      }));
  }

  getSaleByTelephone(telephone) {
    return this.http.get(environment.apiUrl + '/sale/' + telephone)
      .pipe(map(res => {
        this.listSale = [].slice.call(res);
        return this.listSale = this.listSale.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            telephone: data.telephone,
            info: data.info,
            status: data.status,
            date: data.date,
            sum: data.product.reduce((sum, value) => sum + value.product.price * value.quantity, 0),
            product: data.product.map(function (product: any) {
              return {
                id: product._id,
                name: product.product.name,
                image: product.product.image,
                info: product.product.info,
                price: product.product.price,
                quantity: product.quantity,
                category: product.product.category,
                flActive: product.product.flActive
              };
            })
          };
        });
      }));
  }

  postSale(sale: Sale): Observable<any> {
    return this.http.post(environment.apiUrl + '/sale', JSON.stringify(sale), httpOptions);
  }

  putStatusSale(id: string, status: string) {
    return this.http.put(environment.apiUrl + '/sale', JSON.stringify({id: id, status: status}), httpOptions);
  }

  deleteSale(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/sale/' + id, httpOptions);
  }
}
