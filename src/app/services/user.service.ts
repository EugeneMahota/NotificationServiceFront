import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
export class UserService {

  listUser: User[] = [];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get(environment.apiUrl + '/user', httpOptions)
      .pipe(map(users => {
        this.listUser = [].slice.call(users);
        return this.listUser = this.listUser.map(function (data: any) {
          return {
            id: data._id,
            name: data.name,
            email: data.email,
            password: data.password
          };
        });
      }));
  }

  postUser(user: User): Observable<any> {
    return this.http.post(environment.apiUrl + '/user', JSON.stringify(user), httpOptions);
  }

  putUser(user: User): Observable<any> {
    return this.http.put(environment.apiUrl + '/user', JSON.stringify(user), httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/user/' + id);
  }
}
