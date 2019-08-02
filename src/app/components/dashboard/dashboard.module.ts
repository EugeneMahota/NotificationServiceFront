import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'home', loadChildren: '../../controllers/home/home.module#HomeModule'},
      {path: 'user', loadChildren: '../../controllers/user/user.module#UserModule'},
      {path: 'service', loadChildren: '../../controllers/service/service.module#ServiceModule'},
      {path: 'order', loadChildren: '../../controllers/order/order.module#OrderModule'},
      {path: 'request', loadChildren: '../../controllers/request/request.module#RequestModule'},
      {path: 'report-order', loadChildren: '../../controllers/report-order/report-order.module#ReportOrderModule'},
      {path: 'product', loadChildren: '../../controllers/product/product.module#ProductModule'},
      {path: 'sale', loadChildren: '../../controllers/sale/sale.module#SaleModule'},
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
