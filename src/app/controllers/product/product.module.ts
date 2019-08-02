import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes = [
  {path: '', component: ProductComponent},
  {path: 'add', component: AddProductComponent},
  {path: ':id', component: EditProductComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductComponent, AddProductComponent, EditProductComponent]
})
export class ProductModule {
}
