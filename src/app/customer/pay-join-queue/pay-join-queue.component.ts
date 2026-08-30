import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-join-queue',
  templateUrl: './pay-join-queue.component.html',
  styleUrls: ['./pay-join-queue.component.scss']
})
export class PayJoinQueueComponent implements OnInit {

  selectedShop: any = null;
  selectedBarber: any = null;
  selectedServices: any[] = [];

  selectedPayment: string = 'online';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
    this.selectedServices = history.state.services || [];
  }


  // Total payable amount
  get totalPrice(): number {
    return this.selectedServices.reduce(
      (total, service) => total + Number(service.price || 0),
      0
    );
  }


  // Payment option select
  selectPayment(option: string): void {
    this.selectedPayment = option;
  }


  // Back to Review & Confirm
  goBack(): void {
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


  // Proceed to payment
  proceedToPay(): void {

    if (!this.selectedPayment) {
      return;
    }

    console.log('Payment Option:', this.selectedPayment);
    console.log('Total Payable:', this.totalPrice);
    console.log('Shop:', this.selectedShop);
    console.log('Barber:', this.selectedBarber);
    console.log('Services:', this.selectedServices);

    // Actual payment gateway / queue API yahan baad mein connect hoga
  }

}