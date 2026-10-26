import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-confirmed-barber',
  templateUrl: './queue-confirmed-barber.component.html',
  styleUrls: ['./queue-confirmed-barber.component.scss']
})
export class QueueConfirmedBarberComponent implements OnInit, OnDestroy {

  private redirectTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirectTimer = setTimeout(() => {
      this.router.navigate(['/barber/dashboard']);
    }, 2500);
  }

  ngOnDestroy(): void {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  }
}