import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ListServiceComponent} from './list-service/list-service.component';
import {PipeModule} from '../../pipes/pipe.module';

@NgModule({
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ListServiceComponent}])
  ],
  declarations: [ListServiceComponent]
})
export class ServiceModule {
}
