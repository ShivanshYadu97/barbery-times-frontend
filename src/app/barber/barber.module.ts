import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarberRoutingModule } from './barber-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BarberLayoutComponent } from './layout/barber-layout/barber-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AddServicePopUpFormComponent } from './add-service-pop-up-form/add-service-pop-up-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BarberLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    AddServicePopUpFormComponent
  ],
  imports: [
    CommonModule,
    BarberRoutingModule,
    SharedModule
]
})
export class BarberModule {}