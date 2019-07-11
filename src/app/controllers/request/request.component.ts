import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Request} from '../../models/request';
import {ConfirmService} from '../../services/confirm.service';
import {WsService} from '../../services/ws.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  listRequest: Request[] = [];
  activePeriod: string;

  constructor(private requestService: RequestService,
              private confirm: ConfirmService,
              private ws: WsService) {
  }

  ngOnInit() {
    this.activePeriod = this.requestService.activePeriod;
    this.getOrderForPeriod();
  }


  getOrderForPeriod() {
    if (this.activePeriod === 'day') {
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'week') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateStart.setDate(date.getDate() - 6);

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'month') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateStart.setDate(date.getDate() - 30);

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }

    if (this.activePeriod === 'all') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateStart.setFullYear(date.getFullYear() - 10);

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListOrder(dateStart, dateEnd);
    }
  }

  getListOrder(dateStart, dateEnd) {
    this.requestService.getAll(dateStart, dateEnd, this.activePeriod).subscribe(res => {
      this.listRequest = res;
    });
  }

  setActivePeriod(period) {
    this.activePeriod = period;
    this.getOrderForPeriod();
  }

  deleteRequest(request: Request) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы дествително хотите удалить заявку: ' + request.telephone + '?')
      .subscribe(res => {
        if (res === true) {
          this.requestService.deleteRequest(request.id).subscribe(res => {
            this.getOrderForPeriod();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }


  updateStatusRequest(request: Request, status: string) {
    request.status = status;
    this.requestService.putRequest(request).subscribe(res => {
      if (res.status === 'Ok') {
        this.ws.sendMessage('checkRequest', null);
        this.getOrderForPeriod();
      }
    });
  }
}
