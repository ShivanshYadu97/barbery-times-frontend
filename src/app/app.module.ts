import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardTableComponent } from './shared/dashboard-table/dashboard-table.component';
import { CommonModule } from '@angular/common';
// import { DashboardCardComponent } from './shared/dashboard-card/dashboard-card.component';
// import { MobileHeaderComponent } from './shared/mobile-header/mobile-header.component';

@NgModule({
  declarations: [
    AppComponent,
    // DashboardCardComponent,
    // MobileHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
