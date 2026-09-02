import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { BarberAdminService } from 'src/app/State/Barber-Admin/barber-admin.service';
import { BarberAdminState } from 'src/app/State/Barber-Admin/barber-admin.reducer';

import { ShopService } from 'src/app/State/Shop/shop.service';
import { ShopState } from 'src/app/State/Shop/shop.reducer';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services$: Observable<any[]>;
  shops$: Observable<any[]>;

  shopId!: number;

  // ===============================
  // FORM STATE
  // ===============================

  isFormOpen: boolean = false;
  isEditMode: boolean = false;

  selectedService: any = null;


  constructor(
    private barberAdminService: BarberAdminService,
    private shopService: ShopService,

    private store: Store<{
      barberAdmin: BarberAdminState;
      shop: ShopState;
    }>
  ) {

    this.services$ = this.store.select(
      state => state.barberAdmin.services
    );

    this.shops$ = this.store.select(
      state => state.shop.shops
    );
  }


  ngOnInit(): void {

    // Temporary until authentication is implemented
    this.shopService.getShops();

    this.shops$.subscribe((shops) => {

      if (shops.length > 0) {

        const shop = shops[0];

        this.shopId = shop.id;

        this.loadServices();
      }

    });
  }


  // ===============================
  // LOAD SERVICES
  // ===============================

  loadServices(): void {

    if (!this.shopId) {
      return;
    }

    this.barberAdminService.getServicesByShop(
      this.shopId
    );
  }


  // ===============================
  // OPEN ADD FORM
  // ===============================

  addService(): void {

    this.isEditMode = false;

    this.selectedService = null;

    this.isFormOpen = true;
  }


  // ===============================
  // OPEN EDIT FORM
  // ===============================

  editService(service: any): void {

    this.isEditMode = true;

    this.selectedService = service;

    this.isFormOpen = true;
  }


  // ===============================
  // CLOSE FORM
  // ===============================

  closeForm(): void {

    this.isFormOpen = false;

    this.isEditMode = false;

    this.selectedService = null;
  }


  // ===============================
  // SAVE SERVICE
  // ===============================

  saveService(formData: any): void {

    if (!this.shopId) {
      return;
    }

    const requestData = {

      shopId: this.shopId,

      name: formData.name,

      description: formData.description,

      durationMinutes: formData.durationMinutes,

      price: formData.price

    };


    // ===============================
    // EDIT
    // ===============================

    if (this.isEditMode && this.selectedService) {

      this.barberAdminService.updateService(
        this.selectedService.id,
        requestData
      );

    }


    // ===============================
    // ADD
    // ===============================

    else {

      this.barberAdminService.createService(
        requestData
      );

    }


    this.closeForm();
  }


  // ===============================
  // TOGGLE SERVICE STATUS
  // ===============================

  toggleServiceStatus(service: any): void {

    if (!this.shopId) {
      return;
    }

    const requestData = {

      shopId: this.shopId,

      name: service.name,

      description: service.description,

      durationMinutes: service.durationMinutes,

      price: service.price,

      active: !service.active

    };

    this.barberAdminService.updateService(
      service.id,
      requestData
    );
  }

}