import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private alert: AlertService, private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((response: HttpEvent<any>) => {
      this.loadingService.showLoading();
      if (response instanceof HttpResponse) {
        this.loadingService.hideLoading();
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
          if (error.error instanceof Object) {
            this.alert.onAlertList('error', 'Ошибка!', error.error);
          } else {
            console.log(error.error);
            this.alert.onAlertList('error', 'Ошибка!', 'Проверьте вводимы данные!');
          }
        } else if (error.status === 404) {
          this.alert.onAlertList('error', '404!', 'По запросу ничего не найдено!');
        } else if (error.status === 401) {
          this.alert.onAlertList('error', '401!', 'Ошибка авторизации!');
        } else {
          this.alert.onAlertList('error', '', 'Неизвестная ошибка!');
        }
      }

      this.loadingService.hideLoading();
    }));
  }
}
