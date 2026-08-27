import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // barberColumns = [
  //   { key: 'name', label: 'Barber Name' },
  //   { key: 'shiftStartedAt', label: 'Shift Started at' },
  //   { key: 'services', label: "Today's Services" },
  //   { key: 'rating', label: 'Individual Rating' },
  //   { key: 'status', label: 'Current Status' }
  // ];
  barberColumns = [
  { key: 'name', label: 'Barber Name', type: 'barber' },
  { key: 'shiftStartedAt', label: 'Shift Started at', type: 'text' },
  { key: 'services', label: "Today's Services", type: 'text' },
  { key: 'rating', label: 'Individual Rating', type: 'rating' },
  { key: 'status', label: 'Current Status', type: 'status' }
];

  barbers = [
    {
      name: 'Rohit Sharma',
      initials: 'RS',
      shiftStartedAt: '09:00 AM',
      services: 7,
      rating: 4.9,
      status: 'Working'
    },
    {
      name: 'Vikram Patel',
      initials: 'VP',
      shiftStartedAt: '09:15 AM',
      services: 5,
      rating: 4.8,
      status: 'Working'
    },
    {
      name: 'Sandeep Sharma',
      initials: 'SS',
      shiftStartedAt: '10:00 AM',
      services: 6,
      rating: 4.7,
      status: 'Break'
    }
  ];

  isShopOpen: boolean = false;

  toggleShopStatus(): void {
    this.isShopOpen = !this.isShopOpen;
  }

}
