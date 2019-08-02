import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {Order} from '../../models/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-report-order',
  templateUrl: './report-order.component.html',
  styleUrls: ['./report-order.component.scss']
})
export class ReportOrderComponent implements OnInit {

  dateStart: Date;
  dateEnd: Date;
  date: Date = new Date();

  reportOrder: Order[];
  reportTotal: number;

  formDate: FormGroup;

  month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  constructor(private reportService: ReportService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initFormDate();
  }

  initFormDate() {
    this.formDate = this.fb.group({
      dateStart: [new Date(new Date().setHours(0)).setMinutes(0), [Validators.required]],
      dateEnd: [new Date(new Date().setHours(24)).setMinutes(59), [Validators.required]]
    });
  }

  getReport(dateStart: Date, dateEnd: Date) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.reportService.getReportOrder(dateStart, dateEnd).subscribe(res => {
      console.log(res);
      this.reportOrder = res;
      this.reportTotal = this.reportOrder.reduce((sum, value) => sum + value.price, 0);
    });
  }

  getDay() {
    let date: Date = new Date();
    let dateStart: Date = new Date(new Date(date.setHours(0)).setMinutes(0));
    let dateEnd: Date = new Date(new Date(date.setHours(23)).setMinutes(59));

    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  getWeek() {
    let day_milliseconds = 24 * 60 * 60 * 1000;
    let date: Date = new Date();
    let day: number = date.getDay();

    let dateStart = new Date(date.setDate(date.getDate() - day + (day === 0 ? -6 : 1)));
    let dateEnd = new Date(dateStart.getTime() + 6 * day_milliseconds);

    dateStart = new Date(new Date(dateStart.setHours(0)).setMinutes(0));
    dateEnd = new Date(new Date(dateEnd.setHours(23)).setMinutes(59));

    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  getMonth() {
    //start
    let date: Date = new Date();
    let dateStart: Date = new Date(date.setDate(1));
    dateStart = new Date(new Date(dateStart.setHours(0)).setMinutes(0));
    //end
    let dateEnd: Date;
    if (date.getMonth() === 11) {
      dateEnd = new Date(new Date(this.date.setDate(1)).setMonth(1));
      dateEnd = new Date(dateEnd.setFullYear(date.getFullYear() + 1));
    } else {
      dateEnd = new Date(new Date(this.date.setDate(1)).setMonth(date.getMonth() + 1));
    }
    dateEnd = new Date(new Date(dateEnd.setHours(0)).setMinutes(0));
    //add
    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  getYear() {
    //start
    let dateStart: Date = new Date(this.date.setDate(1));
    dateStart = new Date(dateStart.setMonth(0));
    dateStart = new Date(new Date(dateStart.setHours(0)).setMinutes(0));
    //end
    let dateEnd: Date = new Date(this.date.setDate(1));
    dateEnd = new Date(dateEnd.setMonth(0));
    dateEnd = new Date(new Date(dateEnd.setHours(0)).setMinutes(0));
    dateEnd = new Date(dateEnd.setFullYear(dateEnd.getFullYear() + 1));
    //add
    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  editDay(value) {
    let day: number = 24 * 60 * 60 * 1000;
    let dateStart: Date = this.formDate.value.dateStart;
    let dateEnd: Date = this.formDate.value.dateEnd;

    if (value === '+') {
      dateStart = new Date(+dateStart + day);
      dateEnd = new Date(+dateEnd + day);
    }

    if (value === '-') {
      dateStart = new Date(+dateStart - day);
      dateEnd = new Date(+dateEnd - day);
    }
    //add
    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  editWeek(value) {
    let week: number = 24 * 60 * 60 * 1000 * 7;

    let dateStart: Date = this.formDate.value.dateStart;
    let dateEnd: Date = this.formDate.value.dateEnd;

    if (value === '+') {
      dateStart = new Date(+dateStart + week);
      dateEnd = new Date(+dateEnd + week);
    }

    if (value === '-') {
      dateStart = new Date(+dateStart - week);
      dateEnd = new Date(+dateEnd - week);
    }
    //add
    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  editMonth(value) {
    let dateStart: Date = this.formDate.value.dateStart;
    let dateEnd: Date = this.formDate.value.dateEnd;

    if (value === '+') {
      dateStart = new Date(dateStart.setMonth(dateStart.getMonth() + 1));
      dateEnd = new Date(dateEnd.setMonth(dateEnd.getMonth() + 1));
    }

    if (value === '-') {
      dateStart = new Date(dateStart.setMonth(dateStart.getMonth() - 1));
      dateEnd = new Date(dateEnd.setMonth(dateEnd.getMonth() - 1));
    }
    //add
    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }

  editYear(value) {
    let dateStart: Date = this.formDate.value.dateStart;
    let dateEnd: Date = this.formDate.value.dateEnd;

    if (value === '+') {
      dateStart = new Date(dateStart.setFullYear(dateStart.getFullYear() + 1));
      dateEnd = new Date(dateEnd.setFullYear(dateEnd.getFullYear() + 1));
    }

    if (value === '-') {
      dateStart = new Date(dateStart.setFullYear(dateStart.getFullYear() - 1));
      dateEnd = new Date(dateEnd.setFullYear(dateEnd.getFullYear() - 1));
    }
    //add
    this.formDate.controls['dateStart'].setValue(dateStart);
    this.formDate.controls['dateEnd'].setValue(dateEnd);
  }
}
