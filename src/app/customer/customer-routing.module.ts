import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectShopComponent } from './select-shop/select-shop.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { SelectBarberComponent } from './select-barber/select-barber.component';
import { ReviewConfirmComponent } from './review-confirm/review-confirm.component';
import { PayJoinQueueComponent } from './pay-join-queue/pay-join-queue.component';
import { JoiningQueueComponent } from './joining-queue/joining-queue.component';
import { QueueConfirmedComponent } from './queue-confirmed/queue-confirmed.component';

const routes: Routes = [

  {
    path: '',
    component: CustomerLayoutComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'select-shop',
        component: SelectShopComponent
      },

      {
        path: 'select-service',
        component: SelectServiceComponent
      },

      {
        path: 'select-barber',
        component: SelectBarberComponent
      },

      {
        path: 'review-confirm',
        component: ReviewConfirmComponent
      },

      {
        path: 'pay-join-queue',
        component: PayJoinQueueComponent
      },

      {
        path: 'joining-queue',
        component: JoiningQueueComponent
      },
      {
        path: 'queue-confirmed',
        component: QueueConfirmedComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }