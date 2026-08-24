import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarberAdminRoutingModule } from './barber-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { BarberAdminLayoutComponent } from './layout/barber-admin-layout/barber-admin-layout.component';
import { MobileHeaderComponent } from '../shared/mobile-header/mobile-header.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    BarberAdminLayoutComponent,
    MobileHeaderComponent
  ],
  imports: [
    CommonModule,
    BarberAdminRoutingModule
  ]
})
export class BarberAdminModule { }
