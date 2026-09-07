import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { BarberService } from 'src/app/State/Barber/barber.service';
import { BarberState } from 'src/app/State/Barber/barber.reducer';

import {
  startServiceRequest
} from 'src/app/State/Barber/barber.action';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // ==========================================
  // TEMPORARY SHOP / BARBER IDs
  // ==========================================

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
  // SERVICE TIMER
  // ==========================================

  serviceTimerSeconds: number = 0;

  // 5 minutes = 300 seconds
  showServiceWarning: boolean = false;

  private serviceTimer?: ReturnType<typeof setInterval>;


  // ==========================================
  // SUBSCRIPTIONS
  // ==========================================

  private queueSubscription?: Subscription;

  private startServiceSubscription?: Subscription;


  constructor(
    private barberService: BarberService,
    private store: Store<{ barber: BarberState }>
  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

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

        this.isShiftActive =
          barber.shiftActive;

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

          // ==========================================
          // NO QUEUE
          // ==========================================

          if (!queue || queue.length === 0) {

            this.currentCustomer = null;

            this.upcomingQueue = [];

            this.showServiceWarning = false;

            this.stopServiceTimer();

            return;
          }


          // ==========================================
          // CURRENT CUSTOMER
          // ==========================================

          this.currentCustomer = queue[0];


          // ==========================================
          // UPCOMING QUEUE
          // ==========================================

          this.upcomingQueue =
            queue
              .filter(
                (customer) =>
                  customer.status === 'WAITING' ||
                  customer.status === 'IN_SERVICE'
              )
              .map((customer) => ({

                position:
                  customer.queuePosition,

                name:
                  customer.customerName,

                service:
                  customer.services,

                source:
                  'Online',

                waitTime:
                  this.calculateWaitTime(
                    customer.estimatedStartTime
                  ),

                avatar:
                  `https://i.pravatar.cc/100?u=${customer.customerId}`

              }));


          // ==========================================
          // SERVICE TIMER
          // ==========================================

          if (
            this.currentCustomer &&
            this.currentCustomer.status === 'IN_SERVICE' &&
            this.currentCustomer.serviceStartedAt
          ) {

            this.startServiceTimer();

          } else {

            this.stopServiceTimer();

            this.showServiceWarning = false;

          }

        });

  }


  // ==========================================
  // START SERVICE
  // ==========================================

  startService(): void {

    // Current customer nahi hai
    if (!this.currentCustomer) {
      return;
    }


    // Already service running hai
    if (
      this.currentCustomer.status === 'IN_SERVICE'
    ) {
      return;
    }


    const queueId =
      this.currentCustomer.id;


    // ==========================================
    // DISPATCH REQUEST ACTION
    // ==========================================

    this.store.dispatch(
      startServiceRequest({
        queueId
      })
    );


    // ==========================================
    // CALL BACKEND API
    // ==========================================

    this.barberService.startService(queueId);


    // ==========================================
    // SUCCESS RESPONSE STORE SE LISTEN
    // ==========================================

    this.startServiceSubscription?.unsubscribe();

    this.startServiceSubscription =
      this.store
        .select((state) => state.barber.queue)
        .subscribe((queue) => {

          const updatedCustomer =
            queue.find(
              (customer) =>
                customer.id === queueId
            );


          if (
            updatedCustomer &&
            updatedCustomer.status === 'IN_SERVICE' &&
            updatedCustomer.serviceStartedAt
          ) {

            this.currentCustomer =
              updatedCustomer;

            this.startServiceTimer();

            this.startServiceSubscription?.unsubscribe();

            this.startServiceSubscription =
              undefined;

          }

        });

  }


  // ==========================================
  // START SERVICE TIMER
  // ==========================================

  startServiceTimer(): void {

    if (!this.currentCustomer) {
      return;
    }


    if (
      !this.currentCustomer.serviceStartedAt
    ) {
      return;
    }


    // Existing timer stop karo
    this.stopServiceTimer();


    // ==========================================
    // TOTAL SERVICE TIME
    // ==========================================

    const totalDurationMinutes =
      Number(
        this.currentCustomer.totalDurationMinutes
      ) || 0;


    const totalDurationSeconds =
      totalDurationMinutes * 60;


    // ==========================================
    // BACKEND SERVICE START TIME
    // ==========================================

    const serviceStartedAt =
      new Date(
        this.currentCustomer.serviceStartedAt
      ).getTime();


    // ==========================================
    // TIMER FUNCTION
    // ==========================================

    const updateTimer = () => {

      const currentTime =
        new Date().getTime();


      const elapsedSeconds =
        Math.floor(
          (currentTime - serviceStartedAt) / 1000
        );


      const remainingSeconds =
        totalDurationSeconds -
        elapsedSeconds;


      this.serviceTimerSeconds =
        Math.max(
          remainingSeconds,
          0
        );


      // ==========================================
      // 5 MINUTE WARNING
      // ==========================================

      this.showServiceWarning =
        this.serviceTimerSeconds > 0 &&
        this.serviceTimerSeconds <= 300;

      //for 28 min
      // this.showServiceWarning =
      //   this.serviceTimerSeconds > 0 &&
      //   this.serviceTimerSeconds <= 1680;


      // ==========================================
      // SERVICE TIME COMPLETE
      // ==========================================

      if (
        this.serviceTimerSeconds <= 0
      ) {

        this.showServiceWarning = false;

        this.stopServiceTimer();

      }

    };


    // Immediately calculate
    updateTimer();


    // Every second update
    this.serviceTimer =
      setInterval(
        updateTimer,
        1000
      );

  }


  // ==========================================
  // STOP SERVICE TIMER
  // ==========================================

  stopServiceTimer(): void {

    if (this.serviceTimer) {

      clearInterval(
        this.serviceTimer
      );

      this.serviceTimer =
        undefined;

    }

  }


  // ==========================================
  // DISPLAY SERVICE TIMER
  // ==========================================

  getServiceDuration(): string {

    if (!this.currentCustomer) {
      return '00:00:00';
    }


    // Service start nahi hua hai
    if (
      this.currentCustomer.status !==
      'IN_SERVICE'
    ) {

      const totalMinutes =
        Number(
          this.currentCustomer.totalDurationMinutes
        ) || 0;


      const hours =
        Math.floor(
          totalMinutes / 60
        );


      const minutes =
        totalMinutes % 60;


      return `${this.padTime(hours)}:${this.padTime(minutes)}:00`;

    }


    // ==========================================
    // RUNNING TIMER
    // ==========================================

    const totalSeconds =
      this.serviceTimerSeconds;


    const hours =
      Math.floor(
        totalSeconds / 3600
      );


    const minutes =
      Math.floor(
        (totalSeconds % 3600) / 60
      );


    const seconds =
      totalSeconds % 60;


    return `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`;

  }


  // ==========================================
  // PAD TIME
  // ==========================================

  private padTime(
    value: number
  ): string {

    return value
      .toString()
      .padStart(2, '0');

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


    const remainingMinutes =
      Math.floor(
        (targetTime - currentTime) / 60000
      );


    if (remainingMinutes <= 0) {
      return 'Now';
    }


    if (remainingMinutes < 60) {

      return `~${remainingMinutes} min`;

    }


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


    this.barberService.updateBarberShift(
      this.barberId,
      newStatus
    );


    this.isShiftActive =
      newStatus;

  }


  // ==========================================
  // DESTROY
  // ==========================================

  ngOnDestroy(): void {

    this.queueSubscription?.unsubscribe();

    this.startServiceSubscription?.unsubscribe();

    this.stopServiceTimer();

  }

}