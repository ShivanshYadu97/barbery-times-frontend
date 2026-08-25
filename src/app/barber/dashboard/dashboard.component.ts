import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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


//toggle button for Shift Start & Stop
isShiftActive = false;

toggleShift(): void {
  this.isShiftActive = !this.isShiftActive;
}

}
