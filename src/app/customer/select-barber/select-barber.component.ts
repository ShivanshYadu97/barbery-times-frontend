import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-barber',
  templateUrl: './select-barber.component.html',
  styleUrls: ['./select-barber.component.scss']
})
export class SelectBarberComponent {

  selectedShop: any = null;
  selectedBarber: any = null;

  barbers = [
    {
      id: 1,
      name: 'Rohit',
      experience: '4 yrs exp',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Aman',
      experience: '3 yrs exp',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Vikram',
      experience: '3 yrs exp',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Raju',
      experience: '1 yrs exp',
      rating: 4.4
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
  }

  selectBarber(barber: any): void {
    this.selectedBarber = barber;
  }

  selectAnyBarber(): void {
    this.selectedBarber = {
      id: 'any',
      name: 'Any Available Barber'
    };
  }

  continue(): void {
    if (!this.selectedBarber) {
      return;
    }

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

  //back button 
  goBack(): void {
  this.router.navigate(['/customer/select-shop']);
}

}