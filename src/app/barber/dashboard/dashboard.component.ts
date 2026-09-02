import { Component, OnInit } from '@angular/core';
import { BarberService } from 'src/app/State/Barber/barber.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // ==========================================
  // TEMPORARY BARBER ID
  // ==========================================
  // Login/Auth abhi nahi bana hai.
  // Testing ke liye Barber ID 1 use kar rahe hain.

  barberId: number = 1;


  // ==========================================
  // SHIFT STATE
  // ==========================================

  isShiftActive: boolean = false;


  // ==========================================
  // UPCOMING QUEUE
  // ==========================================

  upcomingQueue = [
    {
      position: 1,
      name: 'Rahul',
      service: 'Haircut',
      source: 'Online',
      waitTime: '~10 min',
      avatar: 'https://i.pravatar.cc/100?img=11'
    },
    {
      position: 2,
      name: 'Ramesh',
      service: 'Beard + Haircut',
      source: 'Online',
      waitTime: '~30 min',
      avatar: 'https://i.pravatar.cc/100?img=12'
    },
    {
      position: 3,
      name: 'Suresh',
      service: 'Haircut',
      source: 'Walk-in',
      waitTime: '~50 min',
      avatar: 'https://i.pravatar.cc/100?img=13'
    },
    {
      position: 4,
      name: 'Vikash',
      service: 'Haircut + Beard',
      source: 'Walk-in',
      waitTime: '~1h 10m',
      avatar: 'https://i.pravatar.cc/100?img=14'
    },
    {
      position: 5,
      name: 'Deepak',
      service: 'Haircut',
      source: 'Online',
      waitTime: '~1h 30m',
      avatar: 'https://i.pravatar.cc/100?img=15'
    },
    {
      position: 6,
      name: 'Arjun',
      service: 'Beard + Haircut',
      source: 'Walk-in',
      waitTime: '~1h 50m',
      avatar: 'https://i.pravatar.cc/100?img=16'
    },
    {
      position: 7,
      name: 'Mohit',
      service: 'Haircut',
      source: 'Online',
      waitTime: '~2h 10m',
      avatar: 'https://i.pravatar.cc/100?img=17'
    },
    {
      position: 8,
      name: 'Pankaj',
      service: 'Haircut + Beard',
      source: 'Walk-in',
      waitTime: '~2h 30m',
      avatar: 'https://i.pravatar.cc/100?img=18'
    }
  ];


  constructor(
    private barberService: BarberService
  ) {}


  ngOnInit(): void {

    // Login/Auth abhi nahi bana hai,
    // isliye temporary Barber ID 1 use kar rahe hain.

    this.loadBarber();

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

        // Backend ka actual shift status
        // UI mein set kar rahe hain.

        this.isShiftActive = barber.shiftActive;

      });

  }


  // ==========================================
  // TOGGLE SHIFT
  // ==========================================

  toggleShift(): void {

    const newStatus = !this.isShiftActive;


    // Backend update

    this.barberService.updateBarberShift(
      this.barberId,
      newStatus
    );


    // UI update

    this.isShiftActive = newStatus;

  }

}