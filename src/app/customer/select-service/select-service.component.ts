import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BASE_API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {

  selectedShop: any = null;
  selectedBarber: any = null;

  selectedServices: any[] = [];

  services: any[] = [];

  loading = false;
  error = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    // Previous page se selected shop aur barber receive karna
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;

    // Selected shop ke services load karo
    if (this.selectedShop?.id) {
      this.loadServices();
    } else {
      this.error = 'Shop information not found.';
    }
  }

  loadServices(): void {

    this.loading = true;
    this.error = '';

    const shopId = this.selectedShop.id;

    const url =
      `${BASE_API_URL}/api/barber-menu/shop/${shopId}/customer`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {

        console.log('Customer services:', data);

        this.services = data;

        this.loading = false;
      },

      error: (error) => {

        console.error('Failed to load services:', error);

        this.error = 'Unable to load services. Please try again.';

        this.loading = false;
      }
    });
  }

  goBack(): void {

    this.router.navigate(
      ['/customer/select-barber'],
      {
        state: {
          shop: this.selectedShop
        }
      }
    );
  }

  selectService(service: any): void {

    const index = this.selectedServices.findIndex(
      selected => selected.id === service.id
    );

    if (index > -1) {

      this.selectedServices.splice(index, 1);

    } else {

      this.selectedServices.push(service);

    }
  }

  isServiceSelected(service: any): boolean {

    return this.selectedServices.some(
      selected => selected.id === service.id
    );
  }

  continue(): void {

    // Service select nahi ki hai toh aage nahi jana
    if (this.selectedServices.length === 0) {
      return;
    }

    // Review & Confirm page par selected data bhejna
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
}