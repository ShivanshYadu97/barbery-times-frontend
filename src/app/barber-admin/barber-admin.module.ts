import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarberAdminRoutingModule } from './barber-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { BarberAdminLayoutComponent } from './layout/barber-admin-layout/barber-admin-layout.component';
import { MobileHeaderComponent } from '../shared/mobile-header/mobile-header.component';
import { DashboardCardComponent } from '../shared/dashboard-card/dashboard-card.component';
import { DashboardTableComponent } from '../shared/dashboard-table/dashboard-table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    BarberAdminLayoutComponent,
    MobileHeaderComponent,
    DashboardCardComponent,
    DashboardTableComponent
  ],
  imports: [
    CommonModule,
    BarberAdminRoutingModule
  ]
})
export class BarberAdminModule { }
