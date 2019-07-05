import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmService} from '../../services/confirm.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  itemUser: User;
  listUser: User[] = this.userService.listUser;

  formUser: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private confirm: ConfirmService) {
  }

  ngOnInit() {
    this.getListUser();
    this.initUserForm();
  }

  getListUser() {
    this.userService.getAll().subscribe(res => {
      this.listUser = res;
    });
  }

  initUserForm() {
    this.formUser = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', Validators.required]
    });
  }

  createUser(user: User) {
    this.userService.postUser(user).subscribe(res => {
      this.getListUser();
    });
  }

  deleteUser(id: string) {
    let confirm = this.confirm.openConfirm('Удаление', 'Вы действительно хотите удалить пользователя?')
      .subscribe(res => {
        if (res === true) {
          this.userService.deleteUser(id).subscribe(res => {
            this.getListUser();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  updateUser(user: User) {
    this.userService.putUser(user).subscribe(res => {
      this.getListUser();
      this.itemUser = null;
    });
  }

}
