import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestComponent} from './request.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: RequestComponent}])
  ],
  declarations: [RequestComponent]
})
export class RequestModule {
}
