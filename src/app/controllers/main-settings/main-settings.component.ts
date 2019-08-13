import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressService} from '../../services/address.service';
import {ConfirmService} from '../../services/confirm.service';
import {Address} from '../../models/address';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss']
})
export class MainSettingsComponent implements OnInit {


  itemAddress: Address;
  listAddress: Address[];

  formAddressCreate: FormGroup;
  formAddressUpdate: FormGroup;

  constructor(private fb: FormBuilder, private addressService: AddressService, private confirm: ConfirmService) {
  }

  ngOnInit() {
    this.getListAddress();
    this.initForm();
  }

  initForm() {
    this.formAddressCreate = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
    this.formAddressUpdate = this.fb.group({
      id: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  getListAddress() {
    this.addressService.getAll().subscribe(res => {
      this.listAddress = res;
    });
  }

  deleteAddress(address: Address) {
    let confirm = this.confirm.openConfirm('Удаление адреса', 'Вы дейсвительно хотите удалить адрес, ' + address.address + '?')
      .subscribe(res => {
        if (res === true) {
          this.addressService.deleteAddress(address.id).subscribe(res => {
            this.getListAddress();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  createAddress(address: Address) {
    this.addressService.postAddress(address).subscribe(res => {
      if (res.status === 'Ok') {
        this.formAddressCreate.reset();
        this.getListAddress();
      }
    });
  }

  setAddress(address: Address) {
    this.itemAddress = address;
    this.formAddressUpdate.controls['id'].setValue(address.id);
    this.formAddressUpdate.controls['address'].setValue(address.address);
    this.formAddressUpdate.controls['city'].setValue(address.city);
  }

  updateAddress(address: Address) {
    this.addressService.putAddress(address).subscribe(res => {
      if (res.status === 'Ok') {
        this.formAddressUpdate.reset();
        this.getListAddress();
        this.itemAddress = null;
      }
    });
  }
}
