import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainSettingsComponent} from './main-settings.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MainSettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: MainSettingsComponent}])
  ]
})
export class MainSettingsModule {
}
