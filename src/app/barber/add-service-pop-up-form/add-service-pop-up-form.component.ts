import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { Store } from '@ngrx/store';
import { CustomerService } from 'src/app/State/Customer/customer.service';

import {
  addExtraServices,
  addExtraServicesSuccess,
  addExtraServicesFailure
} from 'src/app/State/Customer/customer.action';

@Component({
  selector: 'app-add-service-pop-up-form',
  templateUrl: './add-service-pop-up-form.component.html',
  styleUrls: ['./add-service-pop-up-form.component.scss']
})
export class AddServicePopUpFormComponent implements OnInit {

  @Input() shopId!: number;
  @Input() customerId!: number;
  @Input() queueId!: number;

  @Output() closePopup = new EventEmitter<void>();

  // All active services
  services: any[] = [];

  // Services available to add
  availableServices: any[] = [];

  // Existing services from current queue
  existingServices: any[] = [];

  // Selected service IDs
  selectedServiceIds: number[] = [];

  loading = false;
  error = '';

  existingServicesLoading = false;
  existingServicesError = '';

  addingExtraServices = false;
  addExtraServicesError = '';

  constructor(
    private customerService: CustomerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (this.shopId && this.customerId) {
      this.loadServices();
      this.loadExistingServices();
    } else {
      this.error = 'Shop or customer information not found.';
    }

    if (!this.queueId) {
      this.addExtraServicesError = 'Queue information not found.';
    }
  }

  // Load active shop services
  loadServices(): void {
    this.loading = true;
    this.error = '';

    this.customerService
      .getActiveServicesByShop(this.shopId)
      .subscribe({
        next: (data) => {
          this.services = data || [];
          this.filterAvailableServices();
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load active services:', error);

          this.error = 'Unable to load services. Please try again.';
          this.loading = false;
        }
      });
  }

  // Load existing queue services
  loadExistingServices(): void {
    this.existingServicesLoading = true;
    this.existingServicesError = '';

    this.customerService
      .getExistingServicesOfCustomer(this.shopId, this.customerId)
      .subscribe({
        next: (data) => {
          this.existingServices = data || [];
          this.filterAvailableServices();
          this.existingServicesLoading = false;
        },
        error: (error) => {
          console.error('Failed to load existing services:', error);

          this.existingServicesError =
            'Unable to load existing services. Please try again.';

          this.existingServicesLoading = false;
        }
      });
  }

  // Filter services already present in the queue
  filterAvailableServices(): void {
    const existingServiceNames = new Set<string>();

    this.existingServices.forEach((item) => {
      if (item.services) {
        item.services
          .split(',')
          .map((name: string) => name.trim().toLowerCase())
          .filter((name: string) => name.length > 0)
          .forEach((name: string) => {
            existingServiceNames.add(name);
          });
      }
    });

    this.availableServices = this.services.filter((service) => {
      const serviceName = service.name?.trim().toLowerCase();

      return serviceName && !existingServiceNames.has(serviceName);
    });

    // Remove selections that are no longer available
    const availableIds = new Set(
      this.availableServices.map(service => Number(service.id))
    );

    this.selectedServiceIds = this.selectedServiceIds.filter(
      id => availableIds.has(id)
    );
  }

  // Select or deselect a service
  toggleService(serviceId: number, checked: boolean): void {
    const id = Number(serviceId);

    if (checked) {
      if (!this.selectedServiceIds.includes(id)) {
        this.selectedServiceIds = [
          ...this.selectedServiceIds,
          id
        ];
      }
    } else {
      this.selectedServiceIds = this.selectedServiceIds.filter(
        selectedId => selectedId !== id
      );
    }

    this.addExtraServicesError = '';
  }

  // Calculate additional duration
  getAdditionalDuration(): number {
    return this.availableServices
      .filter(service =>
        this.selectedServiceIds.includes(Number(service.id))
      )
      .reduce(
        (total, service) =>
          total + Number(service.durationMinutes || 0),
        0
      );
  }

  // Calculate additional price
  getAdditionalAmount(): number {
    return this.availableServices
      .filter(service =>
        this.selectedServiceIds.includes(Number(service.id))
      )
      .reduce(
        (total, service) =>
          total + Number(service.price || 0),
        0
      );
  }

  // Submit selected extra services
  addServices(): void {
    if (!this.queueId) {
      this.addExtraServicesError =
        'Queue information not found. Please reopen the popup.';
      return;
    }

    if (this.selectedServiceIds.length === 0) {
      this.addExtraServicesError =
        'Please select at least one service.';
      return;
    }

    if (this.addingExtraServices) {
      return;
    }

    this.addingExtraServices = true;
    this.addExtraServicesError = '';

    const serviceIds = [...this.selectedServiceIds];

    // Dispatch request action
    this.store.dispatch(
      addExtraServices({
        queueId: this.queueId,
        serviceIds
      })
    );

    // Call backend directly because NgRx Effects are not being used
    this.customerService
      .addExtraServices(this.queueId, serviceIds)
      .subscribe({
        next: (queue) => {
          this.store.dispatch(
            addExtraServicesSuccess({ queue })
          );

          this.addingExtraServices = false;

          // Refresh existing service details
          this.loadExistingServices();

          // Close popup after success
          this.close();
        },
        error: (error) => {
          console.error('Failed to add extra services:', error);

          const message =
            error?.error?.message ||
            'Unable to add extra services. Please try again.';

          this.store.dispatch(
            addExtraServicesFailure({
              error: message
            })
          );

          this.addExtraServicesError = message;
          this.addingExtraServices = false;
        }
      });
  }

  close(): void {
    this.closePopup.emit();
  }
}