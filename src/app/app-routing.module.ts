import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './goards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'login', loadChildren: './components/login/login.module#LoginModule'},
  {path: 'dashboard', loadChildren: './components/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  {path: 'main', loadChildren: './components/main/main.module#MainModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
