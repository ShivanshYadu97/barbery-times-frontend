
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
  addExtraServicesFailure,
  checkCustomerByPhone,
  checkCustomerByPhoneSuccess,
  checkCustomerByPhoneFailure,
  createCustomer,
  createCustomerSuccess,
  createCustomerFailure,
  joinQueue,
  joinQueueSuccess,
  joinQueueFailure
} from './customer.action';

export interface CustomerState {
  queue: any | null;
  services: any[];
  existingServices: any[];

  loading: boolean;
  servicesLoading: boolean;
  existingServicesLoading: boolean;
  addingExtraServices: boolean;

  // Join Queue
  joiningQueue: boolean;
  joinedQueue: any | null;
  joinQueueError: string | null;

  // Check Customer By Phone
  customerCheckLoading: boolean;
  customerExists: boolean | null;
  checkedCustomerId: number | null;
  checkedCustomerName: string | null;
  customerCheckError: string | null;
  customerCheckMessage: string | null;

  error: string | null;
  servicesError: string | null;
  existingServicesError: string | null;
  addExtraServicesError: string | null;

  // Create Customer
  creatingCustomer: boolean;
  createdCustomer: any | null;
  createCustomerError: string | null;
}

export const initialState: CustomerState = {
  queue: null,
  services: [],
  existingServices: [],

  loading: false,
  servicesLoading: false,
  existingServicesLoading: false,
  addingExtraServices: false,

  // Join Queue
  joiningQueue: false,
  joinedQueue: null,
  joinQueueError: null,

  // Check Customer By Phone
  customerCheckLoading: false,
  customerExists: null,
  checkedCustomerId: null,
  checkedCustomerName: null,
  customerCheckError: null,
  customerCheckMessage: null,

  // Create Customer
  creatingCustomer: false,
  createdCustomer: null,
  createCustomerError: null,

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

  on(
    loadExistingServicesOfCustomerSuccess,
    (state, { existingServices }) => ({
      ...state,
      existingServices,
      existingServicesLoading: false,
      existingServicesError: null
    })
  ),

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
  })),

  // Join Queue
  on(joinQueue, (state) => ({
    ...state,
    joiningQueue: true,
    joinedQueue: null,
    joinQueueError: null
  })),

  on(joinQueueSuccess, (state, { queue }) => ({
    ...state,
    joiningQueue: false,
    joinedQueue: queue,
    queue,
    joinQueueError: null
  })),

  on(joinQueueFailure, (state, { error }) => ({
    ...state,
    joiningQueue: false,
    joinQueueError: error
  })),

  // Check Customer By Phone
  on(checkCustomerByPhone, (state) => ({
    ...state,
    customerCheckLoading: true,
    customerExists: null,
    checkedCustomerId: null,
    checkedCustomerName: null,
    customerCheckError: null,
    customerCheckMessage: null
  })),

  on(
    checkCustomerByPhoneSuccess,
    (state, { exists, customerId, name, message }) => ({
      ...state,
      customerCheckLoading: false,
      customerExists: exists,
      checkedCustomerId: customerId ?? null,
      checkedCustomerName: name ?? null,
      customerCheckMessage: message ?? null,
      customerCheckError: null
    })
  ),

  on(checkCustomerByPhoneFailure, (state, { error }) => ({
    ...state,
    customerCheckLoading: false,
    customerExists: null,
    checkedCustomerId: null,
    checkedCustomerName: null,
    customerCheckError: error,
    customerCheckMessage: null
  })),

  // Create Customer
  on(createCustomer, (state) => ({
    ...state,
    creatingCustomer: true,
    createdCustomer: null,
    createCustomerError: null
  })),

  on(createCustomerSuccess, (state, { customer }) => ({
    ...state,
    creatingCustomer: false,
    createdCustomer: customer,
    createCustomerError: null
  })),

  on(createCustomerFailure, (state, { error }) => ({
    ...state,
    creatingCustomer: false,
    createCustomerError: error
  }))
);
