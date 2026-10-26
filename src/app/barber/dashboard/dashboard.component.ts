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
  startServiceRequest,
  stopServiceRequest,
  markNotPresentRequest
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

  showServiceWarning: boolean = false;

  private serviceTimer?: ReturnType<typeof setInterval>;


  // ==========================================
  // SUBSCRIPTIONS
  // ==========================================

  private queueSubscription?: Subscription;

  private startServiceSubscription?: Subscription;


  // ADD EXTRA SERVICE POPUP
  showAddServicePopup: boolean = false;

  // ADD WALK-IN POPUP
  showAddWalkInPopup: boolean = false;

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

          /*
           * estimatedStartTime use nahi karna.
           *
           * Current IN_SERVICE customer ke
           * serviceStartedAt se remaining time niklega.
           *
           * Uske baad har waiting customer ki
           * totalDurationMinutes sequentially add hogi.
           */

          let nextWaitMinutes = 0;


          this.upcomingQueue =
            queue
              .filter(
                (customer) =>
                  customer.status === 'WAITING' ||
                  customer.status === 'IN_SERVICE'
              )
              .map((customer) => {


                // ==========================================
                // CURRENT CUSTOMER
                // ==========================================

                if (
                  customer.status === 'IN_SERVICE' &&
                  customer.serviceStartedAt
                ) {

                  const serviceStartedAt =
                    new Date(
                      customer.serviceStartedAt
                    ).getTime();


                  const elapsedMinutes =
                    Math.floor(
                      (
                        Date.now() -
                        serviceStartedAt
                      ) / 60000
                    );


                  const remainingMinutes =
                    Math.max(
                      Number(
                        customer.totalDurationMinutes || 0
                      ) - elapsedMinutes,
                      0
                    );


                  /*
                   * Current service ka remaining time
                   * first waiting customer ka wait time hai.
                   */

                  nextWaitMinutes =
                    remainingMinutes;


                  return {

                    position:
                      customer.queuePosition,

                    name:
                      customer.customerName,

                    service:
                      customer.services,

                    source:
                      'Online',

                    waitTime:
                      'Now',

                    /*
                     * IMPORTANT:
                     * Timer ke andar next customers ki
                     * duration calculate karne ke liye
                     * duration yahan save kar rahe hain.
                     */

                    duration:
                      Number(
                        customer.totalDurationMinutes || 0
                      ),

                    avatar:
                      `https://i.pravatar.cc/100?u=${customer.customerId}`

                  };

                }


                // ==========================================
                // WAITING CUSTOMER
                // ==========================================

                const waitMinutes =
                  nextWaitMinutes;


                /*
                 * Is customer ki service duration
                 * next customer ke wait time mein add hogi.
                 */

                nextWaitMinutes +=
                  Number(
                    customer.totalDurationMinutes || 0
                  );


                return {

                  position:
                    customer.queuePosition,

                  name:
                    customer.customerName,

                  service:
                    customer.services,

                  source:
                    'Online',

                  waitTime:
                    waitMinutes <= 0
                      ? 'Now'
                      : `~${waitMinutes} min`,

                  duration:
                    Number(
                      customer.totalDurationMinutes || 0
                    ),

                  avatar:
                    `https://i.pravatar.cc/100?u=${customer.customerId}`

                };

              });


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

    if (!this.currentCustomer) {
      return;
    }


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
    // LISTEN FOR STORE UPDATE
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
  // STOP SERVICE
  // ==========================================

  stopService(): void {

    if (!this.currentCustomer) {
      return;
    }


    if (
      this.currentCustomer.status !== 'IN_SERVICE'
    ) {
      return;
    }


    const queueId =
      this.currentCustomer.id;


    // ==========================================
    // DISPATCH REQUEST ACTION
    // ==========================================

    this.store.dispatch(
      stopServiceRequest({
        queueId
      })
    );


    // ==========================================
    // CALL BACKEND API
    // ==========================================

    this.barberService.stopService(queueId);

  }


  // ==========================================
  // MARK NOT PRESENT
  // ==========================================

  markNotPresent(): void {

    if (!this.currentCustomer) {
      return;
    }


    if (
      this.currentCustomer.status !== 'WAITING'
    ) {
      return;
    }


    const queueId =
      this.currentCustomer.id;


    // ==========================================
    // DISPATCH REQUEST ACTION
    // ==========================================

    this.store.dispatch(
      markNotPresentRequest({
        queueId
      })
    );


    // ==========================================
    // CALL BACKEND API
    // ==========================================

    this.barberService.markNotPresent(
      queueId
    );


    // ==========================================
    // LOAD FRESH QUEUE
    // ==========================================

    setTimeout(() => {

      this.loadBarberQueue();

    }, 300);

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
    // SERVICE STARTED AT
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
          (
            currentTime -
            serviceStartedAt
          ) / 1000
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
      // UPDATE UPCOMING QUEUE WAIT TIME
      // ==========================================

      /*
       * Example:
       *
       * Current customer = 27 min remaining
       *
       * Priya = 20 min
       * Mukta = 15 min
       * Amit  = 25 min
       *
       * Result:
       *
       * Current → Now
       * Priya   → ~27 min
       * Mukta   → ~47 min
       * Amit    → ~62 min
       */

      let waitMinutes =
        Math.ceil(
          this.serviceTimerSeconds / 60
        );


      this.upcomingQueue =
        this.upcomingQueue.map(
          (customer, index) => {


            // ==========================================
            // CURRENT CUSTOMER
            // ==========================================

            if (index === 0) {

              return {

                ...customer,

                waitTime:
                  'Now'

              };

            }


            // ==========================================
            // WAITING CUSTOMER
            // ==========================================

            const currentWait =
              waitMinutes;


            /*
             * Current customer ka remaining time
             * + previous waiting customers ki
             * service duration.
             */

            waitMinutes +=
              Number(
                customer.duration || 0
              );


            return {

              ...customer,


              waitTime:
                currentWait <= 0
                  ? 'Now'
                  : currentWait < 60
                    ? `~${currentWait} min`
                    : currentWait % 60 === 0
                      ? `~${Math.floor(currentWait / 60)}h`
                      : `~${Math.floor(currentWait / 60)}h ${currentWait % 60}m`


            };

          }
        );


      // ==========================================
      // SERVICE WARNING
      // ==========================================

      this.showServiceWarning =
        this.serviceTimerSeconds > 0 &&
        this.serviceTimerSeconds <= 300;


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


    // ==========================================
    // FIRST CALCULATION
    // ==========================================

    updateTimer();


    // ==========================================
    // EVERY SECOND
    // ==========================================

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
  // DISPLAY SERVICE DURATION
  // ==========================================

  getServiceDuration(): string {

    if (!this.currentCustomer) {
      return '00:00:00';
    }


    // ==========================================
    // SERVICE NOT STARTED
    // ==========================================

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
    // RUNNING SERVICE
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

  /*
   * Old method retained so existing code/template
   * break na ho.
   *
   * Upcoming Queue mein ab iska use nahi ho raha.
   * estimatedStartTime par dependency nahi hai.
   */

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
        (
          targetTime -
          currentTime
        ) / 60000
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
  // Open pop-up add extra service
  // ==========================================

  openAddServicePopup(): void {
    this.showAddServicePopup = true;
  }

  closeAddServicePopup(): void {
    this.showAddServicePopup = false;
  }

  
  // ==========================================
  // ADD WALK-IN POPUP
  // ==========================================

  openAddWalkInPopup(): void {
    this.showAddWalkInPopup = true;
  }

  closeAddWalkInPopup(): void {
    this.showAddWalkInPopup = false;
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