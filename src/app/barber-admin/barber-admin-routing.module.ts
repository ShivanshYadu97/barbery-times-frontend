import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarberAdminLayoutComponent } from './layout/barber-admin-layout/barber-admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BarberAdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarberAdminRoutingModule { }
