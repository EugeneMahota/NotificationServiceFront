import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../services/auth.service';
import {ConfirmService} from '../../services/confirm.service';

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
        transform: 'rotate(90deg)'
      })),
      transition('right<=>bottom', animate('200ms ease-in-out'))
    ])
  ]
})
export class DashboardComponent implements OnInit {

  stateSide: string;
  switchSide: boolean;

  nameUser: string = 'Евгений Махота';

  dropDownGame: boolean;
  dropDownReport: boolean;

  pathOne: string;
  pathTwo: string;

  constructor(private router: Router, private authService: AuthService, private confirm: ConfirmService) {
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
        } else if (res.urlAfterRedirects === '/dashboard/request') {
          this.pathOne = 'Заявки';
          this.pathTwo = '';
        } else if (res.urlAfterRedirects === '/dashboard/order/add') {
          this.pathOne = 'Заказы';
          this.pathTwo = 'Новый заказ';
        } else {
          this.pathOne = '';
          this.pathTwo = '';
        }
      }
    });
  }

  ngOnInit() {
    this.stateSide = 'smallSide';
    this.switchSide = true;


    this.saveDrop();
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
}
