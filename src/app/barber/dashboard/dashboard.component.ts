import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { BarberService } from 'src/app/State/Barber/barber.service';
import { BarberState } from 'src/app/State/Barber/barber.reducer';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // ==========================================
  // TEMPORARY SHOP / BARBER IDs
  // ==========================================
  // Login/Auth abhi nahi bana hai.
  // Testing ke liye Shop ID 1 aur Barber ID 1 use kar rahe hain.

  shopId: number = 1;
  barberId: number = 1;


  // ==========================================
  // SHIFT STATE
  // ==========================================

  isShiftActive: boolean = false;


  // ==========================================
  // CURRENT CUSTOMER
  // ==========================================

  currentCustomer: any = null;


  // ==========================================
  // UPCOMING QUEUE
  // ==========================================

  upcomingQueue: any[] = [];


  // ==========================================
  // SUBSCRIPTION
  // ==========================================

  private queueSubscription?: Subscription;


  constructor(
    private barberService: BarberService,
    private store: Store<{ barber: BarberState }>
  ) {}


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    // Login/Auth abhi nahi bana hai,
    // isliye temporary Shop ID 1 / Barber ID 1 use kar rahe hain.

    this.loadBarber();

    this.loadBarberQueue();

    this.loadQueueFromStore();

  }


  // ==========================================
  // LOAD BARBER FROM BACKEND
  // ==========================================

  loadBarber(): void {

    this.barberService
      .getBarberById(this.barberId)
      .subscribe((barber) => {

        if (!barber) {
          return;
        }

        // Backend ka actual shift status
        // UI mein set kar rahe hain.

        this.isShiftActive = barber.shiftActive;

      });

  }


  // ==========================================
  // LOAD BARBER QUEUE
  // ==========================================

  loadBarberQueue(): void {

    this.barberService.getBarberQueue(
      this.shopId,
      this.barberId
    );

  }


  // ==========================================
  // LOAD QUEUE FROM STORE
  // ==========================================

  loadQueueFromStore(): void {

    this.queueSubscription =
      this.store
        .select((state) => state.barber.queue)
        .subscribe((queue) => {

          // Agar queue available nahi hai
          if (!queue) {

            this.currentCustomer = null;

            this.upcomingQueue = [];

            return;
          }


          // ==========================================
          // CURRENT CUSTOMER
          // ==========================================
          // Jiska service currently IN_SERVICE hai.

          this.currentCustomer =
            queue.find(
              (customer) =>
                customer.status === 'IN_SERVICE'
            ) || null;


          // ==========================================
          // UPCOMING QUEUE
          // ==========================================
          // Sirf WAITING customers show honge.

          this.upcomingQueue =
            queue
              .filter(
                (customer) =>
                  customer.status === 'WAITING'
              )
              .map((customer) => ({

                position: customer.queuePosition,

                name: customer.customerName,

                service: customer.services,

                // Backend mein abhi source field nahi hai.
                // Temporary value.
                source: 'Online',

                waitTime:
                  this.calculateWaitTime(
                    customer.estimatedStartTime
                  ),

                // Backend mein avatar field nahi hai.
                // Temporary deterministic avatar.
                avatar:
                  `https://i.pravatar.cc/100?u=${customer.customerId}`

              }));

        });

  }


  // ==========================================
  // CALCULATE WAIT TIME
  // ==========================================

  calculateWaitTime(
    estimatedStartTime: string
  ): string {

    if (!estimatedStartTime) {
      return '--';
    }


    const targetTime =
      new Date(
        estimatedStartTime
      ).getTime();


    const currentTime =
      new Date().getTime();


    let remainingMinutes =
      Math.floor(
        (targetTime - currentTime) / 60000
      );


    // Customer ka estimated start time aa chuka hai.

    if (remainingMinutes <= 0) {
      return 'Now';
    }


    // Less than 1 hour

    if (remainingMinutes < 60) {

      return `~${remainingMinutes} min`;

    }


    // 1 hour or more

    const hours =
      Math.floor(
        remainingMinutes / 60
      );


    const minutes =
      remainingMinutes % 60;


    if (minutes === 0) {

      return `~${hours}h`;

    }


    return `~${hours}h ${minutes}m`;

  }


  // ==========================================
  // TOGGLE SHIFT
  // ==========================================

  toggleShift(): void {

    const newStatus =
      !this.isShiftActive;


    // Backend update

    this.barberService.updateBarberShift(
      this.barberId,
      newStatus
    );


    // UI update

    this.isShiftActive =
      newStatus;

  }


  // ==========================================
  // DESTROY
  // ==========================================

  ngOnDestroy(): void {

    this.queueSubscription?.unsubscribe();

  }

}