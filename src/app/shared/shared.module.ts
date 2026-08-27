import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { MessageCardComponent } from './message-card/message-card.component';


@NgModule({
  declarations: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent,
    StatusCardComponent,
    MessageCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent,
    StatusCardComponent,
    MessageCardComponent
  ]
})
export class SharedModule {}