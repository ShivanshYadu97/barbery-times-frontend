import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent {

  selectedShop: any = null;
  selectedBarber: any = null;

  selectedServices: any[] = [];

  services = [
    {
      id: 1,
      name: 'Haircut',
      duration: '20 mins',
      price: 150
    },
    {
      id: 2,
      name: 'Beard',
      duration: '15 mins',
      price: 100
    },
    {
      id: 3,
      name: 'Facial Massage',
      duration: '35 mins',
      price: 250
    },
    {
      id: 4,
      name: 'Kids Haircut',
      duration: '20 mins',
      price: 120
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectedShop = history.state.shop;
    this.selectedBarber = history.state.barber;
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
    if (this.selectedServices.length === 0) {
      return;
    }

    // Next step yahan aayega
    console.log('Selected Shop:', this.selectedShop);
    console.log('Selected Barber:', this.selectedBarber);
    console.log('Selected Services:', this.selectedServices);
  }
}