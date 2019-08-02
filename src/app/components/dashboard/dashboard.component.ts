import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../services/auth.service';
import {ConfirmService} from '../../services/confirm.service';
import {User} from '../../models/user';
import {WsService} from '../../services/ws.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('dropdown', [
      state('void', style({
        marginLeft: '-228px',
        opacity: 0
      })),
      state('*', style({
        marginTop: 0,
        opacity: 1
      })),
      transition('void=>*, *=>void', animate('200ms ease-in-out'))
    ]),
    trigger('arrow', [
      state('right', style({
        transform: 'rotate(0deg)'
      })),
      state('bottom', style({
        transform: 'rotate(-90deg)'
      })),
      transition('right<=>bottom', animate('200ms ease-in-out'))
    ]),
    trigger('notification', [
      state('void', style({
        transform: 'scale(0)'
      })),
      state('*', style({
        transform: 'scale(1)'
      })),
      transition('void=>*, *=>void', animate('150ms ease-in-out'))
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  stateSide: string;
  switchSide: boolean;

  user: User = new User();

  dropDownGame: boolean;
  dropDownReport: boolean;

  pathOne: string;
  pathTwo: string;

  countOrder: number;
  countRequest: number;

  constructor(private router: Router, private authService: AuthService, private confirm: ConfirmService, private ws: WsService) {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res.urlAfterRedirects === '/dashboard/service') {
          this.pathOne = 'Услуги';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/user') {
          this.pathOne = 'Пользователи';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/home') {
          this.pathOne = 'Главная';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/order') {
          this.pathOne = 'Заказы';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/report-order') {
          this.pathOne = 'Отчет по заказам';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/request') {
          this.pathOne = 'Заявки';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/order/add') {
          this.pathOne = 'Заказы';
          this.pathTwo = 'Новый заказ';
        } else if (res.urlAfterRedirects === '/dashboard/product') {
          this.pathOne = 'Товары';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/product/add') {
          this.pathOne = 'Товары';
          this.pathTwo = 'Новый товар';
        } else if (res.urlAfterRedirects.includes('/dashboard/product/')) {
          this.pathOne = 'Товары';
          this.pathTwo = 'Редактировать товар';
        } else if (res.urlAfterRedirects === '/dashboard/sale') {
          this.pathOne = 'Продажи';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects.includes('/dashboard/sale/')) {
          this.pathOne = 'Продажи';
          this.pathTwo = 'Новая продажа';
        } else {
          this.pathOne = '';
          this.pathTwo = '';
        }
      }
    });

    this.ws.getMessage().subscribe(res => {
      if (res.event === 'updateOrder') {
        this.countOrder = res.data;
      }

      if (res.event === 'updateRequest') {
        this.countRequest = res.data;
      }
    });
  }

  ngOnInit() {
    if (window.innerWidth < 1131) {
      this.stateSide = 'hideSide';
      this.switchSide = true;
    } else {
      this.stateSide = localStorage.getItem('stateSide') || 'fullSide';
      this.switchSide = localStorage.getItem('switchSide') === 'true' ? true : false;
    }

    this.saveDrop();
    this.getUser();
    this.checkNotification();
  }

  getUser() {
    this.authService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  onExit() {
    let confirm = this.confirm.openConfirm('Выход', 'Вы уверены, что хотите выйти из профиля?')
      .subscribe(res => {
        if (res === true) {
          this.authService.logOut();
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  Side(device) {
    if (this.stateSide === 'fullSide' && this.switchSide === false) {
      this.stateSide = 'hideSide';
      this.switchSide = true;
    } else if (this.stateSide === 'hideSide' && this.switchSide === true) {
      this.stateSide = 'fullSide';
      this.switchSide = false;
    } else if (this.stateSide === 'smallSide' && device !== 'mobile') {
      this.stateSide = 'fullSide';
      this.switchSide = false;
    }
    localStorage.setItem('switchSide', this.switchSide.toString());
    localStorage.setItem('stateSide', this.stateSide);
  }

  onSmallSide() {
    if (this.stateSide === 'fullSide' && this.switchSide === false) {
      this.stateSide = 'smallSide';
    } else if (this.stateSide === 'smallSide' && this.switchSide === false) {
      this.stateSide = 'hideSide';
      this.switchSide = true;
    } else if (this.stateSide === 'hideSide' && this.switchSide === true) {
      this.stateSide = 'smallSide';
    } else if (this.stateSide === 'smallSide' && this.switchSide === true) {
      this.stateSide = 'fullSide';
      this.switchSide = false;
    }

    localStorage.setItem('switchSide', this.switchSide.toString());
    localStorage.setItem('stateSide', this.stateSide);
  }

  ShowDisplaySm() {
    if (window.innerWidth < 1131) {
      this.Side('mobile');
    }
  }

  dropGame() {
    this.dropDownGame = !this.dropDownGame;
    localStorage.setItem('dropDownGame', JSON.stringify(this.dropDownGame));
  }

  dropReport() {
    this.dropDownReport = !this.dropDownReport;
    localStorage.setItem('dropDownReport', JSON.stringify(this.dropDownReport));
  }

  saveDrop() {
    this.dropDownReport = JSON.parse(localStorage.getItem('dropDownReport')) || false;
    this.dropDownGame = JSON.parse(localStorage.getItem('dropDownGame')) || false;
  }

  checkNotification() {
    this.ws.sendMessage('checkOrder', null);
    this.ws.sendMessage('checkRequest', null);
  }
}
