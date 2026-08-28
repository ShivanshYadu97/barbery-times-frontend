import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() icon: string = '';
  @Input() title: string = '';

  // Stat card ke liye
  @Input() value: string | number = '';
  @Input() subtitle: string = '';
  @Input() actionText: string = '';

  // Quick Action card ke liye
  @Input() isActionCard: boolean = false;
  @Input() description: string = '';

  // Optional navigation route
  @Input() route: string = '';

  constructor(private router: Router) {}

  handleAction(): void {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}