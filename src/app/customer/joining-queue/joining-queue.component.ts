import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joining-queue',
  templateUrl: './joining-queue.component.html',
  styleUrls: ['./joining-queue.component.scss']
})
export class JoiningQueueComponent implements OnInit {

  selectedShop: any = null;
  selectedBarber: any = null;
  selectedServices: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
    this.selectedServices = history.state.services || [];

    // Queue join hone ka temporary loading time
    setTimeout(() => {
      this.router.navigate(
        ['/customer/queue-confirmed'],
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

}