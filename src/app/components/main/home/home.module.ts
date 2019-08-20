import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LandingCardComponent} from './landing-card/landing-card.component';
import {PipeModule} from '../../../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  declarations: [HomeComponent, LandingCardComponent]
})
export class HomeModule {
}
