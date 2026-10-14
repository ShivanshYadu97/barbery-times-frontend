import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Get Customer Queue
  getMyQueue(shopId: number, customerId: number): Observable<any> {
    const url =
      `${BASE_API_URL}/api/queue/shop/${shopId}/customer/${customerId}`;

    return this.http.get<any>(url);
  }

  // Get Active Services By Shop
  getActiveServicesByShop(shopId: number): Observable<any[]> {
    const url =
      `${BASE_API_URL}/api/barber-menu/shop/${shopId}/customer`;

    return this.http.get<any[]>(url);
  }


  // Get Existing Services of Customer from Current Queue
  getExistingServicesOfCustomer(
    shopId: number,
    customerId: number
  ): Observable<any[]> {
    const url =
      `${BASE_API_URL}/api/barber-menu/shop/${shopId}/customer/${customerId}/existing`;

    return this.http.get<any[]>(url);
  }



  // Add Extra Services to Customer Queue
  addExtraServices(
    queueId: number,
    serviceIds: number[]
  ): Observable<any> {
    const url =
      `${BASE_API_URL}/api/queue/${queueId}/extra-services`;

    return this.http.post<any>(url, serviceIds);
  }


}
