import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BarberService } from 'src/app/State/Barber/barber.service';
import { BarberState } from 'src/app/State/Barber/barber.reducer';


@Component({
  selector: 'app-select-barber',
  templateUrl: './select-barber.component.html',
  styleUrls: ['./select-barber.component.scss']
})
export class SelectBarberComponent implements OnInit {

  // ==========================================
  // SHOP
  // ==========================================

  selectedShop: any = null;


  // ==========================================
  // BARBER
  // ==========================================

  selectedBarber: any = null;

  barbers$: Observable<any[]>;


  constructor(
    private router: Router,
    private barberService: BarberService,
    private store: Store<{ barber: BarberState }>
  ) {

    // Get barbers from Barber Store

    this.barbers$ = this.store.select(
      state => state.barber.barbers
    );

  }


  ngOnInit(): void {

    // ==========================================
    // GET SELECTED SHOP
    // ==========================================

    this.selectedShop = history.state.shop;


    // ==========================================
    // LOAD BARBERS FOR CUSTOMER
    // ==========================================

    if (this.selectedShop?.id) {

      this.barberService.getCustomerBarbers(
        this.selectedShop.id
      );

    }

  }


  // ==========================================
  // SELECT BARBER
  // ==========================================

  selectBarber(barber: any): void {

    // Inactive barber cannot be selected

    if (!barber.active) {
      return;
    }


    // Barber whose shift is OFF cannot be selected

    if (!barber.shiftActive) {
      return;
    }


    this.selectedBarber = barber;

  }


  // ==========================================
  // ANY AVAILABLE BARBER
  // ==========================================

  selectAnyBarber(): void {

    this.selectedBarber = {
      id: 'any',
      name: 'Any Available Barber'
    };

  }


  // ==========================================
  // CONTINUE
  // ==========================================

  continue(): void {

    if (!this.selectedBarber) {
      return;
    }


    this.router.navigate(
      ['/customer/select-service'],
      {
        state: {
          shop: this.selectedShop,
          barber: this.selectedBarber
        }
      }
    );

  }


  // ==========================================
  // BARBER STATUS
  // ==========================================

  getBarberStatus(barber: any): string {

    if (!barber.active) {
      return 'Inactive';
    }

    if (!barber.shiftActive) {
      return 'Not Available';
    }

    return 'Available';

  }


  // ==========================================
  // BARBER CAN BE SELECTED?
  // ==========================================

  isBarberAvailable(barber: any): boolean {

    return barber.active === true &&
           barber.shiftActive === true;

  }


  // ==========================================
  // BACK BUTTON
  // ==========================================

  goBack(): void {

    this.router.navigate(
      ['/customer/select-shop']
    );

  }

}