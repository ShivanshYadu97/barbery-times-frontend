import { createReducer, on } from '@ngrx/store';

import {
  createBarberRequest,
  createBarberSuccess,
  createBarberFailure,

  getBarbersRequest,
  getBarbersSuccess,
  getBarbersFailure,

  updateBarberRequest,
  updateBarberSuccess,
  updateBarberFailure,

  deleteBarberRequest,
  deleteBarberSuccess,
  deleteBarberFailure,

  updateBarberShiftRequest,
  updateBarberShiftSuccess,
  updateBarberShiftFailure,

  getCustomerBarbersRequest,
  getCustomerBarbersSuccess,
  getCustomerBarbersFailure,

  getBarberQueueRequest,
  getBarberQueueSuccess,
  getBarberQueueFailure,

  // START SERVICE
  startServiceRequest,
  startServiceSuccess,
  startServiceFailure,

  stopServiceRequest,
  stopServiceSuccess,
  stopServiceFailure

} from './barber.action';


// ==========================================
// BARBER STATE
// ==========================================

export interface BarberState {

  barbers: any[];

  queue: any[];

  loading: boolean;

  error: any;

}


// ==========================================
// INITIAL STATE
// ==========================================

const initialState: BarberState = {

  barbers: [],

  queue: [],

  loading: false,

  error: null

};


// ==========================================
// BARBER REDUCER
// ==========================================

export const barberReducer = createReducer(

  initialState,


  // ==========================================
  // REQUEST
  // ==========================================

  on(
    createBarberRequest,
    getBarbersRequest,
    updateBarberRequest,
    deleteBarberRequest,
    updateBarberShiftRequest,
    getCustomerBarbersRequest,
    getBarberQueueRequest,

    // START SERVICE REQUEST
    startServiceRequest,

    (state) => ({

      ...state,

      loading: true,

      error: null

    })
  ),


  // ==========================================
  // FAILURE
  // ==========================================

  on(
    createBarberFailure,
    getBarbersFailure,
    updateBarberFailure,
    deleteBarberFailure,
    updateBarberShiftFailure,
    getCustomerBarbersFailure,
    getBarberQueueFailure,

    // START SERVICE FAILURE
    startServiceFailure,

    (state, action) => ({

      ...state,

      loading: false,

      error: action.error

    })
  ),


  // ==========================================
  // CREATE SUCCESS
  // ==========================================

  on(
    createBarberSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      barbers: [
        ...state.barbers,
        action.payload
      ]

    })
  ),


  // ==========================================
  // GET SUCCESS
  // ==========================================

  on(
    getBarbersSuccess,
    getCustomerBarbersSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      barbers: action.payload

    })
  ),


  // ==========================================
  // UPDATE SUCCESS
  // ==========================================

  on(
    updateBarberSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      barbers: state.barbers.map(

        (barber) =>

          barber.id === action.payload.id

            ? action.payload

            : barber

      )

    })
  ),


  // ==========================================
  // DELETE SUCCESS
  // ==========================================

  on(
    deleteBarberSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      barbers: state.barbers.map(

        (barber) =>

          barber.id === action.barberId

            ? {

              ...barber,

              active: false,

              shiftActive: false

            }

            : barber

      )

    })
  ),


  // ==========================================
  // SHIFT UPDATE SUCCESS
  // ==========================================

  on(
    updateBarberShiftSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      barbers: state.barbers.map(

        (barber) =>

          barber.id === action.payload.id

            ? action.payload

            : barber

      )

    })
  ),


  // ==========================================
  // BARBER QUEUE SUCCESS
  // ==========================================

  on(
    getBarberQueueSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      queue: action.payload

    })
  ),


  // ==========================================
  // START SERVICE SUCCESS
  // ==========================================
  //


  on(
    startServiceSuccess,

    (state, action) => ({

      ...state,

      loading: false,

      error: null,

      queue: state.queue.map(

        (customer) =>

          customer.id === action.payload.id

            ? action.payload

            : customer

      )

    })
  ),


  // ==========================================
  // STOP SERVICE SUCCESS
  // ==========================================
  //



  on(stopServiceRequest, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(stopServiceSuccess, (state, { queueId }) => ({
    ...state,
    queue: state.queue.filter(
      customer => customer.id !== queueId
    ),
    loading: false,
    error: null
  })),

  on(stopServiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

);