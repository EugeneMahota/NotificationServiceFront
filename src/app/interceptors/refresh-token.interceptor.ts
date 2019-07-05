import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        // console.log(response);
      }
    }, err => {
      if (request.url.includes('login') || request.url.includes('refresh-token')) {
        if (request.url.includes('refresh-token')) {
          this.authService.logOut();
        }
      } else {
        if (err.status !== 401) {

        } else {
          this.authService.refreshToken().subscribe(res => {
            if (res) {
              return this.addRequestToken(request);
            }
          });
        }
      }
    }));
  }

  addRequestToken(request: HttpRequest<any>) {
    const accessToken = this.authService.getAccessToken();

    return request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  }
}
