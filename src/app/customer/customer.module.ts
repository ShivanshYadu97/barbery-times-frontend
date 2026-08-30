import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SelectShopComponent } from './select-shop/select-shop.component';
import { SelectServiceComponent } from './select-service/select-service.component';
import { SelectBarberComponent } from './select-barber/select-barber.component';
import { ReviewConfirmComponent } from './review-confirm/review-confirm.component';
import { PayJoinQueueComponent } from './pay-join-queue/pay-join-queue.component';
import { JoiningQueueComponent } from './joining-queue/joining-queue.component';
import { QueueConfirmedComponent } from './queue-confirmed/queue-confirmed.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomerLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SelectShopComponent,
    SelectServiceComponent,
    SelectBarberComponent,
    ReviewConfirmComponent,
    PayJoinQueueComponent,
    JoiningQueueComponent,
    QueueConfirmedComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
]
})
export class CustomerModule { }
