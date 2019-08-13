import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from '../models/address';
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
export class AddressService {

  listAddress: Address[];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Address[]> {
    return this.http.get(environment.apiUrl + '/address', httpOptions)
      .pipe(map(res => {
        this.listAddress = [].slice.call(res);
        return this.listAddress = this.listAddress.map(function (data: any) {
          return {
            id: data._id,
            city: data.city,
            address: data.address
          };
        });
      }));
  }

  postAddress(address: Address): Observable<any> {
    return this.http.post(environment.apiUrl + '/address', JSON.stringify(address), httpOptions);
  }

  putAddress(address: Address): Observable<any> {
    return this.http.put(environment.apiUrl + '/address', JSON.stringify(address), httpOptions);
  }

  deleteAddress(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/address/' + id, httpOptions);
  }
}
