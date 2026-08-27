import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent {

  @Input() icon: string = '';

  @Input() value: string | number = '';

  @Input() label: string = '';

  @Input() type: 'queue' | 'time' = 'queue';

}