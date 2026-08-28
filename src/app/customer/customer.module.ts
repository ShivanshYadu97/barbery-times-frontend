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

@NgModule({
  declarations: [
    DashboardComponent,
    CustomerLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SelectShopComponent,
    SelectServiceComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
]
})
export class CustomerModule { }
