import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { DashboardTableComponent } from './shared/dashboard-table/dashboard-table.component';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { BarberModule } from './barber/barber.module';

import { StoreModule } from '@ngrx/store';

import { shopReducer } from './State/Shop/shop.reducer';
import { barberReducer } from './State/Barber/barber.reducer';
import { barberAdminReducer } from './State/Barber-Admin/barber-admin.reducer';
import { customerReducer } from './State/Customer/customer.reducer';


@NgModule({

  declarations: [
    AppComponent,
    // DashboardCardComponent,
    // MobileHeaderComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BarberModule,

    StoreModule.forRoot({
      shop: shopReducer,
      barber: barberReducer,
      barberAdmin: barberAdminReducer,
      customer: customerReducer
    })
  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }