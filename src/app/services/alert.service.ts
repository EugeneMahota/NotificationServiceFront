import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  listAlert: any[] = [];
  listAlertEvent: EventEmitter<any> = new EventEmitter<any>();
  timeoutDel: any;

  constructor() {
  }

  onAlertList(type: string, title: string, message: string) {
    this.listAlert.push({type: type, title: title, message: message});
    this.listAlertEvent.emit(this.listAlert);

    this.timeoutDel = setTimeout(() => {
      this.delAlertItem();
    }, 4000);
  }

  delAlertItem() {
    let index: number = this.listAlert.length;
    this.listAlert.splice(-1, 1);
    this.listAlertEvent.emit(this.listAlert);
  }

  delAlert(delAlert) {
    this.listAlert = this.listAlert.filter(alert => alert === delAlert);
    this.listAlertEvent.emit(this.listAlert);
  }
}
