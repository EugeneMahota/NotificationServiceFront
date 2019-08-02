import {Component, OnInit} from '@angular/core';
import {SaleService} from '../../services/sale.service';
import {Sale} from '../../models/sale';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmService} from '../../services/confirm.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  listSale: Sale[];
  activePeriod: string = this.saleService.activePeriod;

  formSearch: FormGroup;

  constructor(private saleService: SaleService, private fb: FormBuilder, private confirm: ConfirmService) {
  }

  ngOnInit() {
    this.getSaleForPeriod();
    this.initFormSearch();
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      telephone: ['', [Validators.required]]
    });
  }

  getListSale(dateStart, dateEnd) {
    this.saleService.getSaleByDate(dateStart, dateEnd, this.activePeriod).subscribe(res => {
      this.listSale = res;
    });
  }

  getSaleByTelephone(telephone: number) {
    this.saleService.getSaleByTelephone(telephone).subscribe(res => {
      this.listSale = res;
    });
  }

  updateStatusSale(id: string, status: string) {
    this.saleService.putStatusSale(id, status).subscribe(res => {
      this.getSaleForPeriod();
    });
  }

  deleteSale(sale: Sale) {
    let confirm = this.confirm.openConfirm('Удаление продажи', 'Вы действительно хотите удалить продажу ' + sale.telephone + '?')
      .subscribe(res => {
        if (res === true) {
          this.saleService.deleteSale(sale.id).subscribe(res => {
            this.getSaleForPeriod();
          });
          confirm.unsubscribe();
        } else if (res === false) {
          confirm.unsubscribe();
        }
      });
  }

  setActivePeriod(period) {
    this.activePeriod = period;
    this.getSaleForPeriod();
  }

  getSaleForPeriod() {
    if (this.activePeriod === 'day') {
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateEnd.setHours(24);
      dateEnd.setMinutes(59);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListSale(dateStart, dateEnd);
    }

    if (this.activePeriod === 'yesterday') {
      let date: Date = new Date();
      let dateEnd: Date = new Date();
      let dateStart: Date = new Date();

      dateEnd.setDate(date.getDate());
      dateStart.setDate(date.getDate() - 1);

      dateEnd.setHours(0);
      dateEnd.setMinutes(0);

      dateStart.setHours(0);
      dateStart.setMinutes(0);

      this.getListSale(dateStart, dateEnd);
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

      this.getListSale(dateStart, dateEnd);
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

      this.getListSale(dateStart, dateEnd);
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

      this.getListSale(dateStart, dateEnd);
    }
  }

}
