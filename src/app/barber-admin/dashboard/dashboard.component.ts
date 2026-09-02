import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ShopService } from 'src/app/State/Shop/shop.service';
import { ShopState } from 'src/app/State/Shop/shop.reducer';

import { BarberService } from 'src/app/State/Barber/barber.service';
import { BarberState } from 'src/app/State/Barber/barber.reducer';


@Component({

  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {


  // ==========================================
  // BARBER TABLE COLUMNS
  // ==========================================

  barberColumns = [

    {
      key: 'name',
      label: 'Barber Name',
      type: 'barber'
    },

    {
      key: 'shiftStartedAt',
      label: 'Shift Started at',
      type: 'text'
    },

    {
      key: 'services',
      label: "Today's Services",
      type: 'text'
    },

    {
      key: 'rating',
      label: 'Individual Rating',
      type: 'rating'
    },

    {
      key: 'status',
      label: 'Current Status',
      type: 'status'
    }

  ];


  // ==========================================
  // BARBER STATE
  // ==========================================

  barbers$: Observable<any[]>;


  // ==========================================
  // SHOP STATE
  // ==========================================

  shops$: Observable<any[]>;

  shopId!: number;

  isShopOpen: boolean = false;


  constructor(

    private shopService: ShopService,

    private barberService: BarberService,

    private store: Store<{
      shop: ShopState;
      barber: BarberState;
    }>

  ) {


    // Shop Store

    this.shops$ = this.store.select(
      state => state.shop.shops
    );


    // Barber Store

    this.barbers$ = this.store.select(
      state => state.barber.barbers
    );

  }


  ngOnInit(): void {


    // ==========================================
    // LOAD SHOPS
    // ==========================================

    this.shopService.getShops();


    // ==========================================
    // GET CURRENT SHOP
    // ==========================================

    this.shops$.subscribe((shops) => {

      if (shops.length > 0) {

        const shop = shops[0];

        this.shopId = shop.id;

        this.isShopOpen = shop.isOpen;


        // ==========================================
        // LOAD BARBERS OF THIS SHOP
        // ==========================================

        this.barberService.getBarbers(this.shopId);

      }

    });

  }


  // ==========================================
  // TOGGLE SHOP STATUS
  // ==========================================

  toggleShopStatus(): void {

    const newStatus = !this.isShopOpen;


    // Update backend

    this.shopService.updateShopStatus(
      this.shopId,
      newStatus
    );


    // Update UI immediately

    this.isShopOpen = newStatus;

  }

}