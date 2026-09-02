import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';

import {
  getShopsSuccess,
  getShopsFailure,
  updateShopStatusSuccess,
  updateShopStatusFailure
} from './shop.action';

import { BASE_API_URL } from 'src/app/config/api';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  API_BASE_URL = BASE_API_URL;

  constructor(
    private store: Store,
    private http: HttpClient
  ) {}


  // Get all shops
  getShops() {

    const url = `${this.API_BASE_URL}/api/shops`;

    return this.http.get<any[]>(url).pipe(

      map((data: any[]) => {

        console.log('shops:', data);

        const shops = data.map((shop: any) => ({
          ...shop,
          isOpen: shop.open
        }));

        return getShopsSuccess({
          payload: shops
        });

      }),

      catchError((error: any) => {

        console.error('Get shops error:', error);

        return of(
          getShopsFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // Update shop open/closed status
  updateShopStatus(shopId: number, isOpen: boolean) {

    const url =
      `${this.API_BASE_URL}/api/shops/${shopId}/status?isOpen=${isOpen}`;

    return this.http.patch(url, {}).pipe(

      map((data: any) => {

        console.log('shop status updated:', data);

        return updateShopStatusSuccess({
          payload: {
            id: shopId,
            ...data,
            open: data.isOpen,
            isOpen: data.isOpen
          }
        });

      }),

      catchError((error: any) => {

        console.error('Update shop status error:', error);

        return of(
          updateShopStatusFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }

}