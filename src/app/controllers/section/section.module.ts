import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SectionComponent} from './section.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: SectionComponent}])
  ]
})
export class SectionModule {
}
