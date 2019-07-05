import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListOrderComponent} from './list-order/list-order.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddOrderComponent } from './add-order/add-order.component';

const routes = [
  {path: '', component: ListOrderComponent},
  {path: 'add', component: AddOrderComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListOrderComponent, AddOrderComponent]
})
export class OrderModule {
}
