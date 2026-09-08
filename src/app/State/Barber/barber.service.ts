import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';

import { BASE_API_URL } from 'src/app/config/api';

import {
  createBarberSuccess,
  createBarberFailure,

  getBarbersSuccess,
  getBarbersFailure,

  updateBarberSuccess,
  updateBarberFailure,

  deleteBarberSuccess,
  deleteBarberFailure,

  updateBarberShiftSuccess,
  updateBarberShiftFailure,

  getCustomerBarbersSuccess,
  getCustomerBarbersFailure,

  getBarberQueueSuccess,
  getBarberQueueFailure,

  // START SERVICE
  startServiceSuccess,
  startServiceFailure,

  stopServiceSuccess,
  stopServiceFailure

} from './barber.action';


@Injectable({
  providedIn: 'root'
})
export class BarberService {

  API_BASE_URL = BASE_API_URL;


  constructor(
    private http: HttpClient,
    private store: Store
  ) { }


  // ==========================================
  // CREATE BARBER
  // ==========================================

  createBarber(
    shopId: number,
    reqData: any
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/shop/${shopId}`;

    return this.http.post(url, reqData).pipe(

      map((data: any) => {

        console.log('barber created:', data);

        return createBarberSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error('Create barber error:', error);

        return of(
          createBarberFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ==========================================
  // GET BARBERS BY SHOP
  // ==========================================

  getBarbers(
    shopId: number
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/shop/${shopId}`;

    return this.http.get<any[]>(url).pipe(

      map((data: any[]) => {

        console.log('shop barbers:', data);

        return getBarbersSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error('Get barbers error:', error);

        return of(
          getBarbersFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ==========================================
  // GET BARBER BY ID
  // ==========================================

  getBarberById(
    barberId: number
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/${barberId}`;

    return this.http.get<any>(url).pipe(

      map((data: any) => {

        console.log('barber details:', data);

        return data;

      }),

      catchError((error: any) => {

        console.error('Get barber by id error:', error);

        return of(null);

      })

    );

  }


  // ==========================================
  // UPDATE BARBER
  // ==========================================

  updateBarber(
    barberId: number,
    reqData: any
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/${barberId}`;

    return this.http.put(url, reqData).pipe(

      map((data: any) => {

        console.log('barber updated:', data);

        return updateBarberSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error('Update barber error:', error);

        return of(
          updateBarberFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ==========================================
  // DELETE / DEACTIVATE BARBER
  // ==========================================

  deleteBarber(
    barberId: number
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/${barberId}`;

    return this.http.delete(url).pipe(

      map(() => {

        console.log(
          'barber deactivated:',
          barberId
        );

        return deleteBarberSuccess({
          barberId
        });

      }),

      catchError((error: any) => {

        console.error(
          'Delete barber error:',
          error
        );

        return of(
          deleteBarberFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });
  }


  // ==========================================
  // UPDATE BARBER SHIFT
  // ==========================================

  updateBarberShift(
    barberId: number,
    shiftActive: boolean
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/${barberId}/shift?shiftActive=${shiftActive}`;

    return this.http.patch(url, {}).pipe(

      map((data: any) => {

        console.log(
          'barber shift updated:',
          data
        );

        return updateBarberShiftSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Update barber shift error:',
          error
        );

        return of(
          updateBarberShiftFailure({
            error: error?.error?.message || error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });

  }


  // ==========================================
  // GET BARBERS FOR CUSTOMER
  // ==========================================

  getCustomerBarbers(
    shopId: number
  ) {

    const url =
      `${this.API_BASE_URL}/api/barbers/shop/${shopId}/customer`;

    return this.http.get<any[]>(url).pipe(

      map((data: any[]) => {

        console.log(
          'customer barbers:',
          data
        );

        return getCustomerBarbersSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Get customer barbers error:',
          error
        );

        return of(
          getCustomerBarbersFailure({
            error:
              error?.error?.message ||
              error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });

  }


  // ==========================================
  // GET BARBER QUEUE
  // ==========================================

  getBarberQueue(
    shopId: number,
    barberId: number
  ) {

    const url =
      `${this.API_BASE_URL}/api/queue/shop/${shopId}/barber/${barberId}`;

    return this.http.get<any[]>(url).pipe(

      map((data: any[]) => {

        console.log(
          'barber queue:',
          data
        );

        return getBarberQueueSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Get barber queue error:',
          error
        );

        return of(
          getBarberQueueFailure({
            error:
              error?.error?.message ||
              error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });

  }


  // ==========================================
  // START SERVICE
  // ==========================================


  startService(
    queueId: number
  ) {

    const url =
      `${this.API_BASE_URL}/api/queue/${queueId}/start`;

    return this.http.post<any>(
      url,
      {}
    ).pipe(

      map((data: any) => {

        console.log(
          'service started:',
          data
        );

        return startServiceSuccess({
          payload: data
        });

      }),

      catchError((error: any) => {

        console.error(
          'Start service error:',
          error
        );

        return of(
          startServiceFailure({
            error:
              error?.error?.message ||
              error?.message
          })
        );

      })

    ).subscribe((action) => {

      this.store.dispatch(action);

    });

  }


  // ==========================================
  // STOP SERVICE
  // ==========================================

  stopService(queueId: number): void {

    this.http.post(
      `http://localhost:8080/api/queue/${queueId}/stop`,
      {},
      { responseType: 'text' }
    ).subscribe({
      next: () => {

        this.store.dispatch(
          stopServiceSuccess({ queueId })
        );

      },

      error: (error) => {

        this.store.dispatch(
          stopServiceFailure({ error })
        );

      }
    });
  }


}