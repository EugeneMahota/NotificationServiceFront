import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Tokens} from '../models/tokens';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokens: Tokens = new Tokens();

  private logIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  signIn(email: string, password: string, flSave: boolean): Observable<any> {
    return this.http.post(environment.apiUrl + '/login', JSON.stringify({email: email, password: password}), httpHeaders)
      .pipe(map(data => {
        if (data['accessToken']) {
          this.router.navigate(['dashboard']);
          this.logIn = true;
          if (flSave) {
            localStorage.setItem('accessToken', data['accessToken']);
            localStorage.setItem('refreshToken', data['refreshToken']);
          } else {
            this.tokens.accessToken = data['accessToken'];
            this.tokens.refreshToken = data['refreshToken'];
          }

          return data;
        }
      }));
  }

  refreshToken(): Observable<Tokens> {
    return this.http.post(environment.apiUrl + '/refresh-tokens',
      JSON.stringify({refreshToken: this.tokens.refreshToken || localStorage.getItem('refreshToken')}), httpHeaders)
      .pipe(map(data => {
        if (data['accessToken']) {
          localStorage.setItem('accessToken', data['accessToken']);
          localStorage.setItem('refreshToken', data['refreshToken']);

          this.tokens.accessToken = data['accessToken'];
          this.tokens.refreshToken = data['refreshToken'];

          this.logIn = true;
          return this.tokens;
        } else {
          this.logOut();
          this.logIn = false;
          return this.tokens;
        }
      }));
  }

  getAccessToken() {
    return localStorage.getItem('accessToken') || this.tokens.accessToken;
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || this.tokens.refreshToken;
  }

  checkLogIn() {
    return this.http.post(environment.apiUrl + '/refresh-tokens',
      JSON.stringify({refreshToken: this.tokens.refreshToken || localStorage.getItem('refreshToken')}), httpHeaders)
      .pipe(map(data => {
        if (data['accessToken']) {
          localStorage.setItem('accessToken', data['accessToken']);
          localStorage.setItem('refreshToken', data['refreshToken']);

          this.tokens.accessToken = data['accessToken'];
          this.tokens.refreshToken = data['refreshToken'];

          this.logIn = true;
          return true;
        } else {
          this.logOut();
          this.logIn = false;
          return false;
        }
      }));
  }

  getLogIn() {
    return this.logIn;
  }

  logOut() {
    this.logIn = false;
    this.tokens = new Tokens();
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
