import { createReducer, on } from '@ngrx/store';

import {
  loadMyQueue,
  loadMyQueueSuccess,
  loadMyQueueFailure,
  loadShopServices,
  loadShopServicesSuccess,
  loadShopServicesFailure,
  loadExistingServicesOfCustomer,
  loadExistingServicesOfCustomerSuccess,
  loadExistingServicesOfCustomerFailure,
  addExtraServices,
  addExtraServicesSuccess,
  addExtraServicesFailure
} from './customer.action';

export interface CustomerState {
  queue: any | null;
  services: any[];
  existingServices: any[];
  loading: boolean;
  servicesLoading: boolean;
  existingServicesLoading: boolean;
  addingExtraServices: boolean;
  error: string | null;
  servicesError: string | null;
  existingServicesError: string | null;
  addExtraServicesError: string | null;
}

export const initialState: CustomerState = {
  queue: null,
  services: [],
  existingServices: [],
  loading: false,
  servicesLoading: false,
  existingServicesLoading: false,
  addingExtraServices: false,
  error: null,
  servicesError: null,
  existingServicesError: null,
  addExtraServicesError: null
};

export const customerReducer = createReducer(
  initialState,

  // Customer Queue
  on(loadMyQueue, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadMyQueueSuccess, (state, { queue }) => ({
    ...state,
    queue,
    loading: false,
    error: null
  })),

  on(loadMyQueueFailure, (state, { error }) => ({
    ...state,
    queue: null,
    loading: false,
    error
  })),

  // Shop Services
  on(loadShopServices, (state) => ({
    ...state,
    servicesLoading: true,
    servicesError: null
  })),

  on(loadShopServicesSuccess, (state, { services }) => ({
    ...state,
    services,
    servicesLoading: false,
    servicesError: null
  })),

  on(loadShopServicesFailure, (state, { error }) => ({
    ...state,
    services: [],
    servicesLoading: false,
    servicesError: error
  })),

  // Existing Services of Customer
  on(loadExistingServicesOfCustomer, (state) => ({
    ...state,
    existingServicesLoading: true,
    existingServicesError: null
  })),

  on(loadExistingServicesOfCustomerSuccess, (state, { existingServices }) => ({
    ...state,
    existingServices,
    existingServicesLoading: false,
    existingServicesError: null
  })),

  on(loadExistingServicesOfCustomerFailure, (state, { error }) => ({
    ...state,
    existingServices: [],
    existingServicesLoading: false,
    existingServicesError: error
  })),

  // Add Extra Services
  on(addExtraServices, (state) => ({
    ...state,
    addingExtraServices: true,
    addExtraServicesError: null
  })),

  on(addExtraServicesSuccess, (state, { queue }) => ({
    ...state,
    queue,
    addingExtraServices: false,
    addExtraServicesError: null
  })),

  on(addExtraServicesFailure, (state, { error }) => ({
    ...state,
    addingExtraServices: false,
    addExtraServicesError: error
  }))
);