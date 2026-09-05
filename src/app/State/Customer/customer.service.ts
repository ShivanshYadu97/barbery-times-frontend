import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getMyQueue(shopId: number, customerId: number): Observable<any> {
    const url =
      `${BASE_API_URL}/api/queue/shop/${shopId}/customer/${customerId}`;

    return this.http.get<any>(url);
  }
}