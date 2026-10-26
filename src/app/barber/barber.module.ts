import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarberRoutingModule } from './barber-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BarberLayoutComponent } from './layout/barber-layout/barber-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AddServicePopUpFormComponent } from './add-service-pop-up-form/add-service-pop-up-form.component';
import { AddWalkInPopupComponent } from './add-walk-in-popup/add-walk-in-popup.component';
import { FormsModule } from '@angular/forms';
import { BarberJoiningQueueComponent } from './joining-queue/joining-queue.component';
import { QueueConfirmedBarberComponent } from './queue-confirmed-barber/queue-confirmed-barber.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BarberLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AddServicePopUpFormComponent,
    AddWalkInPopupComponent,
    BarberJoiningQueueComponent,
    QueueConfirmedBarberComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BarberRoutingModule,
    SharedModule
]
})
export class BarberModule {}