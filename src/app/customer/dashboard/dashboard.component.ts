import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';

import { CustomerService } from 'src/app/State/Customer/customer.service';
import {
  loadMyQueue,
  loadMyQueueSuccess,
  loadMyQueueFailure
} from 'src/app/State/Customer/customer.action';
import { CustomerState } from 'src/app/State/Customer/customer.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Temporary testing IDs
  // Later these will come from logged-in customer/shop
  shopId = 1;
  customerId = 1;

  queue: any = null;

  countdown = '00:00:00';

  loading = false;
  error = '';

  private subscription = new Subscription();
  private countdownSubscription?: Subscription;

  constructor(
    private customerService: CustomerService,
    private store: Store<{ customer: CustomerState }>
  ) {}

  ngOnInit(): void {
    this.loadMyQueue();
  }

  loadMyQueue(): void {

    this.store.dispatch(
      loadMyQueue({
        shopId: this.shopId,
        customerId: this.customerId
      })
    );

    this.loading = true;
    this.error = '';

    this.subscription.add(
      this.customerService
        .getMyQueue(this.shopId, this.customerId)
        .subscribe({
          next: (data) => {

            console.log('Customer Queue:', data);

            this.store.dispatch(
              loadMyQueueSuccess({
                queue: data
              })
            );

            this.queue = data;
            this.loading = false;

            this.startCountdown();
          },

          error: (error) => {

            console.error('Failed to load customer queue:', error);

            const errorMessage =
              error.status === 404
                ? 'You are not currently in the queue.'
                : 'Unable to load your queue status.';

            this.store.dispatch(
              loadMyQueueFailure({
                error: errorMessage
              })
            );

            this.queue = null;
            this.countdown = '00:00:00';
            this.error = errorMessage;
            this.loading = false;

            this.countdownSubscription?.unsubscribe();
          }
        })
    );
  }

  startCountdown(): void {

    this.countdownSubscription?.unsubscribe();

    if (!this.queue?.estimatedStartTime) {
      this.countdown = '00:00:00';
      return;
    }

    this.updateCountdown();

    this.countdownSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  updateCountdown(): void {

    const targetTime =
      new Date(this.queue.estimatedStartTime).getTime();

    const currentTime =
      new Date().getTime();

    let remainingSeconds =
      Math.floor((targetTime - currentTime) / 1000);

    if (remainingSeconds <= 0) {
      this.countdown = '00:00:00';
      return;
    }

    const hours =
      Math.floor(remainingSeconds / 3600);

    remainingSeconds %= 3600;

    const minutes =
      Math.floor(remainingSeconds / 60);

    const seconds =
      remainingSeconds % 60;

    this.countdown =
      `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.countdownSubscription?.unsubscribe();
  }
}