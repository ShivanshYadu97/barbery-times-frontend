import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { MessageCardComponent } from './message-card/message-card.component';
import { ShopCardComponent } from './shop-card/shop-card.component';



@NgModule({
  declarations: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent,
    StatusCardComponent,
    MessageCardComponent,
    ShopCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent,
    StatusCardComponent,
    MessageCardComponent,
    ShopCardComponent,
  ]
})
export class SharedModule {}