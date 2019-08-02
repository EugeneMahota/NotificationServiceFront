import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaleComponent} from './sale.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AddSaleComponent} from './add-sale/add-sale.component';

const routes = [
  {path: '', component: SaleComponent},
  {path: 'add', component: AddSaleComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaleComponent, AddSaleComponent]
})
export class SaleModule {
}
