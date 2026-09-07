import { createAction, props } from '@ngrx/store';


// =============================
// CREATE BARBER
// =============================

export const createBarberRequest = createAction(
  '[Barber] Create Barber Request',
  props<{
    shopId: number;
    payload: any;
  }>()
);

export const createBarberSuccess = createAction(
  '[Barber] Create Barber Success',
  props<{
    payload: any;
  }>()
);

export const createBarberFailure = createAction(
  '[Barber] Create Barber Failure',
  props<{
    error: any;
  }>()
);


// =============================
// GET BARBERS BY SHOP
// =============================

export const getBarbersRequest = createAction(
  '[Barber] Get Barbers Request',
  props<{
    shopId: number;
  }>()
);

export const getBarbersSuccess = createAction(
  '[Barber] Get Barbers Success',
  props<{
    payload: any[];
  }>()
);

export const getBarbersFailure = createAction(
  '[Barber] Get Barbers Failure',
  props<{
    error: any;
  }>()
);


// =============================
// UPDATE BARBER
// =============================

export const updateBarberRequest = createAction(
  '[Barber] Update Barber Request',
  props<{
    barberId: number;
    payload: any;
  }>()
);

export const updateBarberSuccess = createAction(
  '[Barber] Update Barber Success',
  props<{
    payload: any;
  }>()
);

export const updateBarberFailure = createAction(
  '[Barber] Update Barber Failure',
  props<{
    error: any;
  }>()
);


// =============================
// DELETE / DEACTIVATE BARBER
// =============================

export const deleteBarberRequest = createAction(
  '[Barber] Delete Barber Request',
  props<{
    barberId: number;
  }>()
);

export const deleteBarberSuccess = createAction(
  '[Barber] Delete Barber Success',
  props<{
    barberId: number;
  }>()
);

export const deleteBarberFailure = createAction(
  '[Barber] Delete Barber Failure',
  props<{
    error: any;
  }>()
);


// =============================
// UPDATE SHIFT STATUS
// =============================

export const updateBarberShiftRequest = createAction(
  '[Barber] Update Shift Request',
  props<{
    barberId: number;
    shiftActive: boolean;
  }>()
);

export const updateBarberShiftSuccess = createAction(
  '[Barber] Update Shift Success',
  props<{
    payload: any;
  }>()
);

export const updateBarberShiftFailure = createAction(
  '[Barber] Update Shift Failure',
  props<{
    error: any;
  }>()
);


// =============================
// GET BARBERS FOR CUSTOMER
// =============================

export const getCustomerBarbersRequest = createAction(
  '[Barber] Get Customer Barbers Request',
  props<{
    shopId: number;
  }>()
);

export const getCustomerBarbersSuccess = createAction(
  '[Barber] Get Customer Barbers Success',
  props<{
    payload: any[];
  }>()
);

export const getCustomerBarbersFailure = createAction(
  '[Barber] Get Customer Barbers Failure',
  props<{
    error: any;
  }>()
);



// =============================
// GET BARBER QUEUE
// =============================

export const getBarberQueueRequest = createAction(

  '[Barber] Get Barber Queue Request',

  props<{
    shopId: number;
    barberId: number;
  }>()

);

export const getBarberQueueSuccess = createAction(

  '[Barber] Get Barber Queue Success',

  props<{
    payload: any[];
  }>()

);

export const getBarberQueueFailure = createAction(

  '[Barber] Get Barber Queue Failure',

  props<{
    error: any;
  }>()

);



// =============================
// START SERVICE
// =============================

export const startServiceRequest = createAction(

  '[Barber] Start Service Request',

  props<{
    queueId: number;
  }>()

);


export const startServiceSuccess = createAction(

  '[Barber] Start Service Success',

  props<{
    payload: any;
  }>()

);


export const startServiceFailure = createAction(

  '[Barber] Start Service Failure',

  props<{
    error: any;
  }>()

);