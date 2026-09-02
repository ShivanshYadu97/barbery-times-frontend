import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { MessageCardComponent } from './message-card/message-card.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { BarberMenuFormComponent } from './barber-menu-form/barber-menu-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent,
    StatusCardComponent,
    MessageCardComponent,
    ShopCardComponent,
    BarberMenuFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DashboardCardComponent,
    DashboardTableComponent,
    MobileHeaderComponent,
    StatusCardComponent,
    MessageCardComponent,
    ShopCardComponent,
    BarberMenuFormComponent
  ]
})
export class SharedModule {}