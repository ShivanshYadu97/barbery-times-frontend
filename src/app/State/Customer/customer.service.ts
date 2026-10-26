
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';

import {
  checkCustomerByPhoneSuccess,
  checkCustomerByPhoneFailure,
  createCustomerSuccess,
  createCustomerFailure,
  loadShopServicesSuccess,
  loadShopServicesFailure,
  joinQueueSuccess,
  joinQueueFailure
} from './customer.action';

export interface CustomerByPhoneResponse {
  exists: boolean;
  customerId?: number;
  name?: string;
  message?: string;
}

export interface CreateCustomerRequest {
  name: string;
  phone: string;
  email: string | null;
  password: string;
  role: 'BARBER' | 'BARBER_ADMIN' | 'CUSTOMER' | 'SUPER_ADMIN';
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  // Get Customer Queue
  getMyQueue(shopId: number, customerId: number) {
    const url =
      `${BASE_API_URL}/api/queue/shop/${shopId}/customer/${customerId}`;

    return this.http.get<any>(url);
  }

  // // Get Active Services By Shop
  // getActiveServicesByShop(shopId: number) {
  //   const url =
  //     `${BASE_API_URL}/api/barber-menu/shop/${shopId}/customer`;

  //   return this.http.get<any[]>(url);
  // }

  // Get Active Services By Shop
  getActiveServicesByShop(shopId: number): void {
    const url =
      `${BASE_API_URL}/api/barber-menu/shop/${shopId}/customer`;

    this.http.get<any[]>(url).pipe(
      map(response => {
        console.log('Customer services fetched successfully:', response);

        return loadShopServicesSuccess({
          services: response
        });
      }),
      catchError(error => {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          'Failed to load shop services';

        return of(
          loadShopServicesFailure({
            error: errorMessage
          })
        );
      })
    ).subscribe(action => this.store.dispatch(action));
  }

  // Get Existing Services of Customer from Current Queue
  getExistingServicesOfCustomer(
    shopId: number,
    customerId: number
  ) {
    const url =
      `${BASE_API_URL}/api/barber-menu/shop/${shopId}/customer/${customerId}/existing`;

    return this.http.get<any[]>(url);
  }

  // Add Extra Services to Customer Queue
  addExtraServices(
    queueId: number,
    serviceIds: number[]
  ) {
    const url =
      `${BASE_API_URL}/api/queue/${queueId}/extra-services`;

    return this.http.post<any>(url, serviceIds);
  }

  // Check Customer By Mobile Number
  checkCustomerByPhone(phone: string): void {
    const url = `${BASE_API_URL}/api/users/by-phone`;

    this.http.get<CustomerByPhoneResponse>(url, {
      params: { phone }
    }).pipe(
      map(response => {
        console.log('Customer check response:', response);

        return checkCustomerByPhoneSuccess(response);
      }),
      catchError(error => {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          'Failed to check customer';

        return of(
          checkCustomerByPhoneFailure({
            error: errorMessage
          })
        );
      })
    ).subscribe(action => this.store.dispatch(action));
  }

  // Create New Customer
  createCustomer(customerData: CreateCustomerRequest): void {
    const url = `${BASE_API_URL}/api/users`;

    this.http.post<any>(url, customerData).pipe(
      map(response => {
        console.log('Customer created successfully:', response);

        return createCustomerSuccess({
          customer: response
        });
      }),
      catchError(error => {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          'Failed to create customer';

        return of(
          createCustomerFailure({
            error: errorMessage
          })
        );
      })
    ).subscribe(action => this.store.dispatch(action));
  }


  // Join Queue
  joinQueue(queueData: {
    shopId: number;
    customerId: number;
    barberId: number;
    serviceIds: number[];
    entryType: 'WALK_IN' | 'ONLINE';
  }): void {
    const url = `${BASE_API_URL}/api/queue/join`;

    this.http.post<any>(url, queueData).pipe(
      map(response => {
        console.log('Customer joined queue successfully:', response);

        return joinQueueSuccess({
          queue: response
        });
      }),
      catchError(error => {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          'Failed to join queue';

        return of(
          joinQueueFailure({
            error: errorMessage
          })
        );
      })
    ).subscribe(action => this.store.dispatch(action));
  }


}
