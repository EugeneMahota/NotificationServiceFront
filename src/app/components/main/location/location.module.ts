import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationComponent} from './location.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: LocationComponent}])
  ],
  declarations: [LocationComponent]
})
export class LocationModule {
}
