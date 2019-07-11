import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../services/request.service';
import {Request} from '../../../models/request';
import {AlertService} from '../../../services/alert.service';
import {WsService} from '../../../services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formRequest: FormGroup;

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private alert: AlertService,
              private ws: WsService) {
  }

  ngOnInit() {
    this.initFormRequest();
  }

  initFormRequest() {
    this.formRequest = this.fb.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      info: ['', [Validators.required]]
    });
  }

  createRequest(request: Request) {
    this.requestService.postRequest(request).subscribe(res => {
      if (res.status === 'Ok') {
        this.ws.sendMessage('addRequest', null);
        this.alert.onAlertList('success', 'Успех!', 'Ваш запрос отправлен, скоро мы вам перезвоним!');
      }
    });
  }

}
