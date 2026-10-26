import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BarberLayoutComponent } from './layout/barber-layout/barber-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarberJoiningQueueComponent } from './joining-queue/joining-queue.component';
import { QueueConfirmedBarberComponent } from './queue-confirmed-barber/queue-confirmed-barber.component';

const routes: Routes = [
  {
    path: '',
    component: BarberLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'joining-queue',
        component: BarberJoiningQueueComponent
      },
      {
        path: 'queue-confirmed',
        component: QueueConfirmedBarberComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarberRoutingModule {}