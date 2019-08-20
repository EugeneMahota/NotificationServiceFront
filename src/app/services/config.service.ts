import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigApp} from '../models/configApp';
import {Observable, pipe} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

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
export class ConfigService {

  listConfig: ConfigApp[];

  constructor(private http: HttpClient) {
  }

  getListConfig(): Observable<ConfigApp[]> {
    return this.http.get(environment.apiUrl + '/config', httpOptions)
      .pipe(map(res => {
        this.listConfig = [].slice.call(res);
        return this.listConfig = this.listConfig.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            logoLight: data.logoLight,
            logoDark: data.logoDark,
            imageHeader: data.imageHeader,
            titleHeader: data.titleHeader,
            textHeader: data.textHeader,
          };
        });
      }));
  }

  postConfig(configData: FormData): Observable<any> {
    return this.http.post(environment.apiUrl + '/config', configData, httpOptionsMulti);
  }

  putConfig(configData: FormData): Observable<any> {
    return this.http.put(environment.apiUrl + '/config', configData, httpOptionsMulti);
  }


  deleteConfig(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/config/' + id);
  }
}
