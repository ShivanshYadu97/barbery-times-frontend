import { createReducer, on } from '@ngrx/store';

import {
  getBarberAdminServices,
  getBarberAdminServicesSuccess,
  getBarberAdminServicesFailure,

  createBarberAdminService,
  createBarberAdminServiceSuccess,
  createBarberAdminServiceFailure,

  updateBarberAdminService,
  updateBarberAdminServiceSuccess,
  updateBarberAdminServiceFailure,

  deleteBarberAdminService,
  deleteBarberAdminServiceSuccess,
  deleteBarberAdminServiceFailure
} from './barber-admin.action';

export interface BarberAdminState {
  services: any[];
  loading: boolean;
  error: any;
}

export const initialState: BarberAdminState = {
  services: [],
  loading: false,
  error: null
};

export const barberAdminReducer = createReducer(
  initialState,

  // ===============================
  // GET SERVICES
  // ===============================

  on(getBarberAdminServices, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(getBarberAdminServicesSuccess, (state, { payload }) => ({
    ...state,
    services: payload,
    loading: false,
    error: null
  })),

  on(getBarberAdminServicesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  // ===============================
  // CREATE SERVICE
  // ===============================

  on(createBarberAdminService, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(createBarberAdminServiceSuccess, (state, { payload }) => ({
    ...state,
    services: [...state.services, payload],
    loading: false,
    error: null
  })),

  on(createBarberAdminServiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  // ===============================
  // UPDATE SERVICE
  // ===============================

  on(updateBarberAdminService, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(updateBarberAdminServiceSuccess, (state, { payload }) => ({
    ...state,
    services: state.services.map((service) =>
      service.id === payload.id
        ? payload
        : service
    ),
    loading: false,
    error: null
  })),

  on(updateBarberAdminServiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),


  // ===============================
  // DELETE / DEACTIVATE SERVICE
  // ===============================

  on(deleteBarberAdminService, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(deleteBarberAdminServiceSuccess, (state, { id }) => ({
    ...state,
    services: state.services.map((service) =>
      service.id === id
        ? { ...service, active: false }
        : service
    ),
    loading: false,
    error: null
  })),

  on(deleteBarberAdminServiceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);