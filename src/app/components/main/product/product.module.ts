import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ProductComponent}]),
    PipeModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule {
}
