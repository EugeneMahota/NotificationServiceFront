import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Request} from '../models/request';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  activePeriod: string = 'day';
  listRequest: Request[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(dateStart, dateEnd, activePeriod) {
    this.activePeriod = activePeriod;
    return this.http.get(environment.apiUrl + '/request', {params: {dateStart: dateStart.toString(), dateEnd: dateEnd.toString()}})
      .pipe(map(res => {
        this.listRequest = [].slice.call(res);
        return this.listRequest = this.listRequest.map(function (data: any) {
          return {
            id: data._id,
            status: data.status,
            name: data.name,
            telephone: data.telephone,
            date: data.date,
            info: data.info,
          };
        });
      }));
  }

  postRequest(request: Request): Observable<any> {
    return this.http.post(environment.apiUrl + '/request', JSON.stringify(request), httpOptions);
  }

  putRequest(request: Request): Observable<any> {
    return this.http.put(environment.apiUrl + '/request', JSON.stringify(request), httpOptions);
  }

  deleteRequest(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/request/' + id, httpOptions);
  }
}
