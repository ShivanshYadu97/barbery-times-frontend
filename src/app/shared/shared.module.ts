import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';

@NgModule({
  declarations: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent
  ]
})
export class SharedModule {}