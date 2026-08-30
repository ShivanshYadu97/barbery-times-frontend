import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-confirm',
  templateUrl: './review-confirm.component.html',
  styleUrls: ['./review-confirm.component.scss']
})
export class ReviewConfirmComponent implements OnInit {

  selectedShop: any = null;
  selectedBarber: any = null;
  selectedServices: any[] = [];

  // Temporary booking information
  bookingDate: string = 'Today';
  bookingTime: string = '10:30 AM';

  queuePosition: number = 4;
  estimatedWaitTime: string = '15–20 mins';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
    this.selectedServices = history.state.services || [];
  }


  // Total price of selected services
  get totalPrice(): number {
    return this.selectedServices.reduce(
      (total, service) => total + Number(service.price || 0),
      0
    );
  }


  // Total duration of selected services
  get totalDuration(): number {
    return this.selectedServices.reduce(
      (total, service) => {
        const minutes = parseInt(service.duration, 10) || 0;
        return total + minutes;
      },
      0
    );
  }


  goBack(): void {
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


  confirmBooking(): void {

    if (!this.selectedShop || this.selectedServices.length === 0) {
      return;
    }

    this.router.navigate(
      ['/customer/pay-join-queue'],
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