
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barber-joining-queue',
  templateUrl: './joining-queue.component.html',
  styleUrls: ['./joining-queue.component.scss']
})
export class BarberJoiningQueueComponent implements OnInit, OnDestroy {

  selectedShop: any = null;
  selectedBarber: any = null;
  selectedServices: any[] = [];

  private navigationTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
    this.selectedServices = history.state.services || [];

    // Temporary navigation; actual queue API integration baad mein karenge.
    this.navigationTimer = setTimeout(() => {
      this.router.navigate(
        ['/barber/queue-confirmed'],
        {
          state: {
            shop: this.selectedShop,
            barber: this.selectedBarber,
            services: this.selectedServices
          }
        }
      );
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.navigationTimer) {
      clearTimeout(this.navigationTimer);
    }
  }
}
