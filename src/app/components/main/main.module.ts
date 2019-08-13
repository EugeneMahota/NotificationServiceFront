import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';

const routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'feedback', pathMath: 'full'},
      {path: 'feedback', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)},
      {path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)},
      {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
      {path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)},
      {path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
      {path: 'basket', loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule)}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainComponent, NavbarComponent, FooterComponent]
})
export class MainModule {
}
