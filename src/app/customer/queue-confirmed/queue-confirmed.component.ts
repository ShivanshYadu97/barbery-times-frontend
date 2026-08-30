import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-confirmed',
  templateUrl: './queue-confirmed.component.html',
  styleUrls: ['./queue-confirmed.component.scss']
})
export class QueueConfirmedComponent implements OnInit {

  selectedShop: any = null;
  selectedBarber: any = null;
  selectedServices: any[] = [];

  queuePosition: number = 3;
  estimatedWaitTime: string = '00:50:00';

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
    this.selectedServices = history.state.services || [];

  }

  goToDashboard(): void {
    this.router.navigate(['/customer/dashboard']);
  }

}