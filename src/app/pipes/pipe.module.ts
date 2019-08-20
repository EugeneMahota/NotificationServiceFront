import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPipe} from './searchPipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchPipe, OrderByPipe],
  exports: [SearchPipe, OrderByPipe]
})
export class PipeModule {
}
