import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent {

  @Input() columns: {
  key: string;
  label: string;
  type?: string;
}[] = [];

  @Input() data: any[] = [];

}