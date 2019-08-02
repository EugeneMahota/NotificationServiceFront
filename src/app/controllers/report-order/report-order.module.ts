import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportOrderComponent} from './report-order.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ReportOrderComponent}]),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [ReportOrderComponent]
})
export class ReportOrderModule {
}
