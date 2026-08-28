import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent {

  // Shop basic details
  @Input() shop: any;

  // Whether this shop is currently selected
  @Input() isSelected: boolean = false;

  // Send selected shop back to parent component
  @Output() shopSelected = new EventEmitter<any>();


  selectShop(): void {

    // Closed shop cannot be selected
    if (!this.shop.isOpen) {
      return;
    }

    this.shopSelected.emit(this.shop);
  }

}