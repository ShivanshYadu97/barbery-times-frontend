
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  loadShopServices
} from 'src/app/State/Customer/customer.action';

import {
  CustomerState
} from 'src/app/State/Customer/customer.reducer';

import {
  CustomerService
} from 'src/app/State/Customer/customer.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit, OnDestroy {

  selectedShop: any = null;
  selectedBarber: any = null;

  selectedServices: any[] = [];
  services: any[] = [];

  loading = false;
  error = '';

  private storeSubscription?: Subscription;

  constructor(
    private router: Router,
    private store: Store<{ customer: CustomerState }>,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {

    // Previous page se selected shop aur barber receive karna
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;

    // NgRx Store se services, loading aur error observe karna
    this.storeSubscription = this.store
      .select('customer')
      .subscribe(state => {
        this.services = state.services ?? [];
        this.loading = state.servicesLoading;
        this.error = state.servicesError ?? '';
      });

    // Selected shop ke services load karo
    if (this.selectedShop?.id) {
      this.loadServices();
    } else {
      this.error = 'Shop information not found.';
    }
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  loadServices(): void {

    this.loading = true;
    this.error = '';

    const shopId = this.selectedShop.id;

    // NgRx loading action
    this.store.dispatch(
      loadShopServices({ shopId })
    );

    // Service API call karke success/failure action dispatch karegi
    this.customerService.getActiveServicesByShop(shopId);
  }

  goBack(): void {

    this.router.navigate(
      ['/customer/select-barber'],
      {
        state: {
          shop: this.selectedShop
        }
      }
    );
  }

  selectService(service: any): void {

    const index = this.selectedServices.findIndex(
      selected => selected.id === service.id
    );

    if (index > -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
  }

  isServiceSelected(service: any): boolean {

    return this.selectedServices.some(
      selected => selected.id === service.id
    );
  }

  continue(): void {

    // Service select nahi ki hai toh aage nahi jana
    if (this.selectedServices.length === 0) {
      return;
    }

    // Review & Confirm page par selected data bhejna
    this.router.navigate(
      ['/customer/review-confirm'],
      {
        state: {
          shop: this.selectedShop,
          barber: this.selectedBarber,
          services: this.selectedServices
        }
      }
    );
  }
}
