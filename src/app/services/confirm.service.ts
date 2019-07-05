import {EventEmitter, Injectable} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  confirm = {title: '', message: ''};
  confirmEvent: EventEmitter<any> = new EventEmitter<any>();

  statusConfirm: boolean;

  constructor() {
  }

  openConfirm(title: string, message: string): Observable<any> {
    this.statusConfirm = undefined;

    this.confirm.title = title;
    this.confirm.message = message;

    this.confirmEvent.emit(this.confirm);

    return interval(500).pipe(flatMap(() => {
      return new Observable((observer) => {
        observer.next(this.statusConfirm);
      });
    }));
  }

  setConfirm(status: boolean) {
    this.statusConfirm = status;
    this.closeConfirm();
  }

  closeConfirm() {
    this.confirm = {title: '', message: ''};
    this.confirmEvent.emit(this.confirm);
  }
}
