
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription, filter, take } from 'rxjs';
import { Router } from '@angular/router';

import {
  checkCustomerByPhone,
  createCustomer,
  loadShopServices
} from 'src/app/State/Customer/customer.action';

import {
  CustomerState
} from 'src/app/State/Customer/customer.reducer';

import {
  CustomerService,
  CreateCustomerRequest
} from 'src/app/State/Customer/customer.service';

type WalkInStep =
  | 'METHOD'
  | 'MOBILE'
  | 'NEW_CUSTOMER'
  | 'SERVICES';

interface WalkInService {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-add-walk-in-popup',
  templateUrl: './add-walk-in-popup.component.html',
  styleUrls: ['./add-walk-in-popup.component.scss']
})
export class AddWalkInPopupComponent implements OnInit, OnDestroy {

  @Output() closePopup = new EventEmitter<void>();

  currentStep: WalkInStep = 'METHOD';

  // Temporary hardcoded shop ID
  private readonly shopId = 1;

  mobileNumber = '';
  customerName = '';
  customerId: number | null = null;

  newCustomerName = '';
  newCustomerEmail = '';

  customerCheckLoading = false;
  isCreatingCustomer = false;

  loadingServices = false;
  servicesError = '';

  private customerCheckSubscription?: Subscription;
  private createCustomerSubscription?: Subscription;
  private servicesSubscription?: Subscription;
  private createCustomerTimer?: ReturnType<typeof setTimeout>;

  // Services ab backend se load hongi
  services: WalkInService[] = [];

  constructor(
    private customerService: CustomerService,
    private store: Store<{ customer: CustomerState }>,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Store se services, loading aur error observe karo
    this.servicesSubscription = this.store
      .select('customer')
      .subscribe(state => {
        this.services = (state.services ?? []).map(service => ({
          id: Number(service.id),
          name: service.name,
          selected:
            this.services.find(
              existing => existing.id === Number(service.id)
            )?.selected ?? false
        }));

        this.loadingServices = state.servicesLoading;
        this.servicesError = state.servicesError ?? '';
      });

    // Shop ID 1 ki services load karo
    this.loadServices();
  }

  ngOnDestroy(): void {
    this.customerCheckSubscription?.unsubscribe();
    this.createCustomerSubscription?.unsubscribe();
    this.servicesSubscription?.unsubscribe();

    if (this.createCustomerTimer) {
      clearTimeout(this.createCustomerTimer);
    }
  }

  // Load active services from backend
  loadServices(): void {
    this.loadingServices = true;
    this.servicesError = '';

    this.store.dispatch(
      loadShopServices({ shopId: this.shopId })
    );

    this.customerService.getActiveServicesByShop(this.shopId);
  }

  close(): void {
    this.closePopup.emit();
  }

  selectMethod(method: 'DETAILS' | 'QR'): void {
    if (method === 'DETAILS') {
      this.currentStep = 'MOBILE';
    } else {
      console.log('Entry by QR code selected');
    }
  }

  onMobileNumberChange(value: string): void {
    this.mobileNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  goBack(): void {
    if (this.isCreatingCustomer || this.customerCheckLoading) {
      return;
    }

    if (
      this.currentStep === 'SERVICES' ||
      this.currentStep === 'NEW_CUSTOMER'
    ) {
      this.currentStep = 'MOBILE';
    } else if (this.currentStep === 'MOBILE') {
      this.currentStep = 'METHOD';
    }
  }

  continue(): void {
    if (this.customerCheckLoading || this.isCreatingCustomer) {
      return;
    }

    if (!/^[6-9]\d{9}$/.test(this.mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    this.customerCheckLoading = true;
    this.customerName = '';
    this.customerId = null;
    this.newCustomerName = '';
    this.newCustomerEmail = '';

    this.customerCheckSubscription?.unsubscribe();

    this.store.dispatch(
      checkCustomerByPhone({ phone: this.mobileNumber })
    );

    this.customerCheckSubscription = this.store
      .select('customer')
      .pipe(
        filter(
          state =>
            state.customerCheckError !== null ||
            state.customerExists === true ||
            state.customerExists === false
        ),
        take(1)
      )
      .subscribe(state => {
        this.customerCheckLoading = false;

        if (state.customerCheckError) {
          console.error(
            'Customer API error:',
            state.customerCheckError
          );

          alert(state.customerCheckError);
          return;
        }

        if (state.customerExists === true) {
          this.customerId = state.checkedCustomerId;
          this.customerName = state.checkedCustomerName ?? '';

          console.log('Existing customer found:', {
            customerId: this.customerId,
            name: this.customerName
          });

          this.currentStep = 'SERVICES';
          return;
        }

        if (state.customerExists === false) {
          console.log(
            'Customer not found:',
            state.customerCheckMessage
          );

          this.currentStep = 'NEW_CUSTOMER';
        }
      });

    this.customerService.checkCustomerByPhone(this.mobileNumber);
  }

  confirmNewCustomer(): void {
    if (this.isCreatingCustomer) {
      return;
    }

    const name = this.newCustomerName.trim();
    const email = this.newCustomerEmail.trim();

    if (!name) {
      alert('Please enter customer name');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(this.mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number');
      this.currentStep = 'MOBILE';
      return;
    }

    this.isCreatingCustomer = true;

    const requestStartedAt = Date.now();

    const payload: CreateCustomerRequest = {
      name,
      email: email || null,
      phone: this.mobileNumber,
      password: '12345678',
      role: 'CUSTOMER'
    };

    this.createCustomerSubscription?.unsubscribe();

    this.store.dispatch(createCustomer(payload));

    this.createCustomerSubscription = this.store
      .select('customer')
      .pipe(
        filter(
          state =>
            !state.creatingCustomer &&
            (
              !!state.createdCustomer ||
              !!state.createCustomerError
            )
        ),
        take(1)
      )
      .subscribe(state => {
        const elapsed = Date.now() - requestStartedAt;
        const remainingTime = Math.max(0, 2000 - elapsed);

        this.createCustomerTimer = setTimeout(() => {
          this.isCreatingCustomer = false;

          if (state.createCustomerError) {
            console.error(
              'Create customer API error:',
              state.createCustomerError
            );

            alert(state.createCustomerError);
            return;
          }

          const customer = state.createdCustomer;

          if (!customer) {
            alert('Customer create nahi ho paya. Please try again.');
            return;
          }

          this.customerId =
            customer.id ?? customer.customerId ?? null;

          this.customerName = customer.name ?? name;

          if (this.customerId === null) {
            alert(
              'Customer create hua, lekin response mein customer ID nahi mili.'
            );
            return;
          }

          console.log('Customer created successfully:', customer);

          this.currentStep = 'SERVICES';
        }, remainingTime);
      });

    this.customerService.createCustomer(payload);
  }

  submitWalkIn(): void {
    const selectedServices = this.services.filter(
      service => service.selected
    );

    if (this.customerId === null) {
      alert('Customer ID nahi mili. Please customer details check karo.');
      return;
    }

    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    // API ke liye request JSON
    const queueData = {
      shopId: this.shopId,
      customerId: this.customerId,
      barberId: 1,
      serviceIds: selectedServices.map(service => service.id),
      entryType: 'WALK_IN' as const
    };

    console.log('Join Queue Request:', queueData);

    // Existing CustomerService API call
    this.customerService.joinQueue(queueData);

    // Joining Queue screen par redirect
    this.router.navigate(
      ['/barber/joining-queue'],
      {
        state: {
          shop: { id: queueData.shopId },
          barber: { id: queueData.barberId },
          services: selectedServices,
          customerId: queueData.customerId,
          customerName: this.customerName,
          mobileNumber: this.mobileNumber
        }
      }
    );

    this.closePopup.emit();
  }


}
