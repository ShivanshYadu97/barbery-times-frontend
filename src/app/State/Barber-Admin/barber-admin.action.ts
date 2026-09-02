import { createAction, props } from '@ngrx/store';

// ===============================
// GET SERVICES
// ===============================

export const getBarberAdminServices = createAction(
  '[Barber Admin] Get Services',
  props<{ shopId: number }>()
);

export const getBarberAdminServicesSuccess = createAction(
  '[Barber Admin] Get Services Success',
  props<{ payload: any[] }>()
);

export const getBarberAdminServicesFailure = createAction(
  '[Barber Admin] Get Services Failure',
  props<{ error: any }>()
);


// ===============================
// CREATE SERVICE
// ===============================

export const createBarberAdminService = createAction(
  '[Barber Admin] Create Service',
  props<{ payload: any }>()
);

export const createBarberAdminServiceSuccess = createAction(
  '[Barber Admin] Create Service Success',
  props<{ payload: any }>()
);

export const createBarberAdminServiceFailure = createAction(
  '[Barber Admin] Create Service Failure',
  props<{ error: any }>()
);


// ===============================
// UPDATE SERVICE
// ===============================

export const updateBarberAdminService = createAction(
  '[Barber Admin] Update Service',
  props<{
    id: number;
    payload: any;
  }>()
);

export const updateBarberAdminServiceSuccess = createAction(
  '[Barber Admin] Update Service Success',
  props<{ payload: any }>()
);

export const updateBarberAdminServiceFailure = createAction(
  '[Barber Admin] Update Service Failure',
  props<{ error: any }>()
);


// ===============================
// DELETE / DEACTIVATE SERVICE
// ===============================

export const deleteBarberAdminService = createAction(
  '[Barber Admin] Delete Service',
  props<{ id: number }>()
);

export const deleteBarberAdminServiceSuccess = createAction(
  '[Barber Admin] Delete Service Success',
  props<{ id: number }>()
);

export const deleteBarberAdminServiceFailure = createAction(
  '[Barber Admin] Delete Service Failure',
  props<{ error: any }>()
);