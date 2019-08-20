import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SectionComponent} from './section.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../pipes/pipe.module';


@NgModule({
  declarations: [SectionComponent],
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: SectionComponent}])
  ]
})
export class SectionModule {
}
