import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'home', loadChildren: () => import('../../controllers/home/home.module').then(m => m.HomeModule)},
      {path: 'user', loadChildren: () => import('../../controllers/user/user.module').then(m => m.UserModule)},
      {path: 'service', loadChildren: () => import('../../controllers/service/service.module').then(m => m.ServiceModule)},
      {path: 'order', loadChildren: () => import('../../controllers/order/order.module').then(m => m.OrderModule)},
      {path: 'request', loadChildren: () => import('../../controllers/request/request.module').then(m => m.RequestModule)},
      {path: 'report-order', loadChildren: () => import('../../controllers/report-order/report-order.module').then(m => m.ReportOrderModule)},
      {path: 'product', loadChildren: () => import('../../controllers/product/product.module').then(m => m.ProductModule)},
      {path: 'sale', loadChildren: () => import('../../controllers/sale/sale.module').then(m => m.SaleModule)},
      {path: 'section', loadChildren: () => import('../../controllers/section/section.module').then(m => m.SectionModule)},
      {path: 'main-settings', loadChildren: () => import('../../controllers/main-settings/main-settings.module').then(m => m.MainSettingsModule)},
      {redirectTo: 'home', pathMath: 'full', path: ''}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
