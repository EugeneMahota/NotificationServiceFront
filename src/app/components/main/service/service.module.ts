import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceComponent} from './service.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ServiceComponent}]),
    PipeModule
  ],
  declarations: [ServiceComponent]
})
export class ServiceModule {
}
