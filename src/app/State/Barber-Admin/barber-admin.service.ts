import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';

import { BASE_API_URL } from 'src/app/config/api';

import {
  getBarberAdminServicesSuccess,
  getBarberAdminServicesFailure,

  createBarberAdminServiceSuccess,
  createBarberAdminServiceFailure,

  updateBarberAdminServiceSuccess,
  updateBarberAdminServiceFailure,

  deleteBarberAdminServiceSuccess,
  deleteBarberAdminServiceFailure
} from './barber-admin.action';

@Injectable({
  providedIn: 'root'
})
export class BarberAdminService {

  API_BASE_URL = BASE_API_URL;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  // ===============================
  // GET SERVICES BY SHOP
  // ===============================

  getServicesByShop(shopId: number) {

    const url =
      `${this.API_BASE_URL}/api/barber-menu/shop/${shopId}`;

    return this.http.get<any[]>(url).pipe(

      map((data: any[]) => {

        console.log('Barber admin services:', data);

        return getBarberAdminServicesSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Get barber admin services error:',
          error
        );

        return of(
          getBarberAdminServicesFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ===============================
  // CREATE SERVICE
  // ===============================

  createService(reqData: any) {

    const url =
      `${this.API_BASE_URL}/api/barber-menu`;

    return this.http.post(url, reqData).pipe(

      map((data: any) => {

        console.log('Barber menu created:', data);

        return createBarberAdminServiceSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Create barber menu error:',
          error
        );

        return of(
          createBarberAdminServiceFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ===============================
  // UPDATE SERVICE
  // ===============================

  updateService(
    id: number,
    reqData: any
  ) {

    const url =
      `${this.API_BASE_URL}/api/barber-menu/${id}`;

    return this.http.put(url, reqData).pipe(

      map((data: any) => {

        console.log('Barber menu updated:', data);

        return updateBarberAdminServiceSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Update barber menu error:',
          error
        );

        return of(
          updateBarberAdminServiceFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ===============================
  // DELETE / DEACTIVATE SERVICE
  // ===============================

  deleteService(id: number) {

    const url =
      `${this.API_BASE_URL}/api/barber-menu/${id}`;

    return this.http.delete(url).pipe(

      map(() => {

        console.log(
          'Barber menu deactivated:',
          id
        );

        return deleteBarberAdminServiceSuccess({
          id
        });

      }),

      catchError((error: any) => {

        console.error(
          'Delete barber menu error:',
          error
        );

        return of(
          deleteBarberAdminServiceFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }

}