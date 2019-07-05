import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('refresh-token') || request.url.includes('login')) {
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getAccessToken()
        }
      });
    }

    return next.handle(request);
  }
}
