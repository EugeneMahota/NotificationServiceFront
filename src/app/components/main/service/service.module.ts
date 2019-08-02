import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceComponent} from './service.component';
import {RouterModule} from '@angular/router';
import {SearchPipe} from '../../../pipes/searchPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ServiceComponent}])
  ],
  declarations: [ServiceComponent, SearchPipe]
})
export class ServiceModule {
}
