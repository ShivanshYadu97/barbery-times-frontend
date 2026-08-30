import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-shop',
  templateUrl: './select-shop.component.html',
  styleUrls: ['./select-shop.component.scss']
})
export class SelectShopComponent {

  shops = [
    {
      id: 1,
      name: "Sharma's Cuts",
      rating: 4.6,
      reviewCount: 230,
      distance: '0.3 km',
      isOpen: true
    },
    {
      id: 2,
      name: 'Classic Cuts',
      rating: 4.4,
      reviewCount: 185,
      distance: '0.8 km',
      isOpen: true
    },
    {
      id: 3,
      name: 'Style Studio',
      rating: 4.7,
      reviewCount: 312,
      distance: '1.2 km',
      isOpen: false
    },
    {
      id: 4,
      name: "Men's Craft",
      rating: 4.5,
      reviewCount: 150,
      distance: '1.5 km',
      isOpen: true
    }
  ];

  selectedShop: any = null;

  constructor(
    private router: Router,
    private location: Location
  ) {}

  // Back to previous page
  goBack(): void {
    this.location.back();
  }

  // Select shop and move to Select Service
  selectShop(shop: any): void {

    // Closed shop cannot be selected
    if (!shop.isOpen) {
      return;
    }

    // Save selected shop
    this.selectedShop = shop;

    // Move directly to Select Service
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