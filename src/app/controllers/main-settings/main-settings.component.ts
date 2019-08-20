import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressService} from '../../services/address.service';
import {ConfirmService} from '../../services/confirm.service';
import {Address} from '../../models/address';
import {ConfigService} from '../../services/config.service';
import {ConfigApp} from '../../models/configApp';

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

  listConfig: ConfigApp[];
  itemConfig: ConfigApp;
  formConfig: FormGroup;

  logoDark: File;
  logoLight: File;
  imageHeader: File;

  constructor(private fb: FormBuilder,
              private addressService: AddressService,
              private confirm: ConfirmService,
              private configService: ConfigService) {
  }

  ngOnInit() {
    this.getListAddress();
    this.initForm();

    this.getListConfig();
    this.initFormConfig();
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

  //Конфигурационные настройки -----------------------

  getListConfig() {
    this.configService.getListConfig().subscribe(res => {
      this.listConfig = res;
      if (res[0]) {
        this.itemConfig = res[0];
        this.formConfig.controls['name'].setValue(res[0].name);
        this.formConfig.controls['titleHeader'].setValue(res[0].titleHeader);
        this.formConfig.controls['textHeader'].setValue(res[0].textHeader);
      } else {
        this.itemConfig = null;
        this.formConfig.reset();
      }
    });
  }

  initFormConfig() {
    this.formConfig = this.fb.group({
      name: ['', Validators.required],
      titleHeader: ['', Validators.required],
      textHeader: ['', Validators.required],
    });
  }

  controlFormConfig(config: ConfigApp) {
    if (this.listConfig.length === 0) {
      this.createConfig(config);
    } else {
      this.updateConfig(config);
    }
  }

  selectLogoLight(event) {
    this.logoLight = event.target.files.item(0);
  }

  selectLogoDark(event) {
    this.logoDark = event.target.files.item(0);
  }

  selectImageHeader(event) {
    this.imageHeader = event.target.files.item(0);
  }

  createConfig(config: ConfigApp) {
    const dataConfig = new FormData();

    dataConfig.append('name', config.name);
    dataConfig.append('titleHeader', config.titleHeader);
    dataConfig.append('textHeader', config.textHeader);
    dataConfig.append('logoLight', this.logoLight);
    dataConfig.append('logoDark', this.logoDark);
    dataConfig.append('imageHeader', this.imageHeader);

    console.log(config);
    this.configService.postConfig(dataConfig).subscribe(res => {
      this.getListConfig();
    });
  }

  updateConfig(config: ConfigApp) {
    const dataConfig = new FormData();

    dataConfig.append('id', this.itemConfig.id);
    dataConfig.append('name', config.name);
    dataConfig.append('titleHeader', config.titleHeader);
    dataConfig.append('textHeader', config.textHeader);

    if (this.logoLight) {
      dataConfig.append('logoLight', this.logoLight);
    }
    if (this.logoDark) {
      dataConfig.append('logoDark', this.logoDark);
    }
    if (this.imageHeader) {
      dataConfig.append('imageHeader', this.imageHeader);
    }

    this.configService.putConfig(dataConfig).subscribe(res => {
      this.getListConfig();
    });
  }

  deleteConfig(config: ConfigApp) {
    let confirm = this.confirm.openConfirm('Удаление конфигурации', 'Вы действительно хотите очистить конфигурацию?')
      .subscribe(res => {
        if (res === true) {
          this.configService.deleteConfig(config.id).subscribe(res => {
            this.getListConfig();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }
}
