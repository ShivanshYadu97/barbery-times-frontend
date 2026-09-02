import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ShopService } from 'src/app/State/Shop/shop.service';
import { ShopState } from 'src/app/State/Shop/shop.reducer';


@Component({
  selector: 'app-select-shop',
  templateUrl: './select-shop.component.html',
  styleUrls: ['./select-shop.component.scss']
})
export class SelectShopComponent implements OnInit {

  shops$: Observable<any[]>;

  selectedShop: any = null;


  constructor(
    private router: Router,
    private location: Location,
    private store: Store<{ shop: ShopState }>,
    private shopService: ShopService
  ) {
    this.shops$ = this.store.select(state => state.shop.shops);
  }


  ngOnInit(): void {

    // Load shops from backend
    this.shopService.getShops();

  }


  // Back to previous page
  goBack(): void {

    this.location.back();

  }


  // Select shop and move to Select Barber
  selectShop(shop: any): void {

    // Closed shop cannot be selected
    if (!shop.isOpen) {
      return;
    }

    // Save selected shop
    this.selectedShop = shop;

    // Move to Select Barber
    this.router.navigate(
      ['/customer/select-barber'],
      {
        state: {
          shop: shop
        }
      }
    );

  }

}