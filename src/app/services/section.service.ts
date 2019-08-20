import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Section} from '../models/section';
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
export class SectionService {

  listSection: Section[];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Section[]> {
    return this.http.get(environment.apiUrl + '/section', httpOptions)
      .pipe(map(res => {
        this.listSection = [].slice.call(res);
        return this.listSection = this.listSection.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            number: data.number
          };
        });
      }));
  }

  postSection(section: Section): Observable<any> {
    return this.http.post(environment.apiUrl + '/section', JSON.stringify(section), httpOptions);
  }

  putSection(section: Section): Observable<any> {
    return this.http.put(environment.apiUrl + '/section', JSON.stringify(section), httpOptions);
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/section/' + id, httpOptions);
  }
}
