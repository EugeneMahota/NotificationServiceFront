import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {NavbarComponent} from './navbar/navbar.component';

const routes = [
  {path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'feedback', pathMath: 'full'},
      {path: 'feedback', loadChildren: './home/home.module#HomeModule'},
      {path: 'service', loadChildren: './service/service.module#ServiceModule'},
      {path: 'contact', loadChildren: './contact/contact.module#ContactModule'},
      {path: 'order', loadChildren: './order/order.module#OrderModule'},
      {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainComponent, NavbarComponent]
})
export class MainModule {
}
