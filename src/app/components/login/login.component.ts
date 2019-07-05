import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  flSave: boolean;
  email: string;
  password: string;

  constructor(private authService: AuthService) {
    this.flSave = true;
  }

  ngOnInit() {
  }

  signIn(email: string, password: string, flSave: boolean) {
    this.authService.signIn(email, password, flSave).subscribe(res => {
    });
  }
}
