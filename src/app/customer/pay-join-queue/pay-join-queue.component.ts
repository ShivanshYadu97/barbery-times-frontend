
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter, skip, take } from 'rxjs';

import {
  CustomerService
} from 'src/app/State/Customer/customer.service';

import {
  TestingService
} from 'src/app/State/Customer/testing.service';

import {
  CustomerState
} from 'src/app/State/Customer/customer.reducer';

@Component({
  selector: 'app-pay-join-queue',
  templateUrl: './pay-join-queue.component.html',
  styleUrls: ['./pay-join-queue.component.scss']
})
export class PayJoinQueueComponent implements OnInit, OnDestroy {

  selectedShop: any = null;
  selectedBarber: any = null;
  selectedServices: any[] = [];

  selectedPayment = 'online';

  customerId: number | null = null;
  isSubmitting = false;

  private queueSubscription?: Subscription;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private testingService: TestingService,
    private store: Store<{ customer: CustomerState }>
  ) {}

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
    this.selectedServices = history.state.services || [];

    this.customerId = this.testingService.customerId;
  }

  ngOnDestroy(): void {
    this.queueSubscription?.unsubscribe();
  }

  get totalPrice(): number {
    return this.selectedServices.reduce(
      (total, service) => total + Number(service.price || 0),
      0
    );
  }

  selectPayment(option: string): void {
    this.selectedPayment = option;
  }

  goBack(): void {
    this.router.navigate(['/customer/review-confirm'], {
      state: {
        shop: this.selectedShop,
        shopId:
          this.selectedShop?.id ??
          this.selectedShop?.shopId ??
          this.testingService.shopId,
        barber: this.selectedBarber,
        services: this.selectedServices,
        customerId: this.customerId
      }
    });
  }

  proceedToPay(): void {
    if (this.isSubmitting) {
      return;
    }

    if (!this.selectedPayment) {
      alert('Please select a payment option.');
      return;
    }

    // Online payment integration baad mein add karenge.
    if (this.selectedPayment === 'online') {
      console.log('Razorpay flow will come here later');
      return;
    }

    if (this.selectedPayment !== 'shop') {
      return;
    }

    const shopId = Number(
      this.selectedShop?.id ??
      this.selectedShop?.shopId ??
      this.testingService.shopId
    );

    const customerId = this.testingService.customerId;

    const barberId = Number(
      this.selectedBarber?.id ??
      this.selectedBarber?.barberId
    );

    const serviceIds = this.selectedServices
      .map(service => Number(service.id ?? service.serviceId))
      .filter(id => Number.isFinite(id) && id > 0);

    if (!Number.isFinite(shopId) || shopId <= 0) {
      alert('Shop ID nahi mili. Please shop details check karo.');
      return;
    }

    if (!Number.isFinite(customerId) || customerId <= 0) {
      alert('Customer ID nahi mili. TestingService check karo.');
      return;
    }

    if (!Number.isFinite(barberId) || barberId <= 0) {
      alert('Barber ID nahi mili. Please barber select karo.');
      return;
    }

    if (serviceIds.length === 0) {
      alert('Please select at least one service.');
      return;
    }

    const queueData = {
      shopId,
      customerId,
      barberId,
      serviceIds,
      entryType: 'ONLINE' as const
    };

    this.isSubmitting = true;

    // API result ke baad service success/failure action dispatch karti hai.
    // Initial Store state ko skip karte hain.
    this.queueSubscription?.unsubscribe();

    this.queueSubscription = this.store.select('customer').pipe(
      skip(1),
      filter(state =>
        !!state.joinedQueue || !!state.joinQueueError
      ),
      take(1)
    ).subscribe(state => {
      this.isSubmitting = false;

      if (state.joinQueueError) {
        alert(state.joinQueueError);
        return;
      }

      if (state.joinedQueue) {
        console.log('Queue joined successfully:', state.joinedQueue);

        this.router.navigate(['/customer/joining-queue'], {
          state: {
            shop: this.selectedShop,
            shopId,
            barber: this.selectedBarber,
            services: this.selectedServices,
            customerId
          }
        });
      }
    });

    // Service unchanged: it calls API and dispatches success/failure.
    this.customerService.joinQueue(queueData);
  }
}
