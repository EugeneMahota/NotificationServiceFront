import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private alert: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        if (response.body.status) {
          if (response.body.status === 'Error') {
            this.alert.onAlertList('error', 'Ошибка!', response.body.msg);
          }
          if (response.body.status === 'Ok') {
            this.alert.onAlertList('success', '', 'Операция выполненна успешно.');
          }
        }
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 500) {
          this.alert.onAlertList('error', 'Ошибка!', error.error);
        }
      }
    }));
  }
}
