import { createAction, props } from '@ngrx/store';

// Load Customer Queue
export const loadMyQueue = createAction(
  '[Customer] Load My Queue',
  props<{
    shopId: number;
    customerId: number;
  }>()
);

export const loadMyQueueSuccess = createAction(
  '[Customer] Load My Queue Success',
  props<{
    queue: any;
  }>()
);

export const loadMyQueueFailure = createAction(
  '[Customer] Load My Queue Failure',
  props<{
    error: string;
  }>()
);

// Load Active Shop Services for Add Extra Service Popup
export const loadShopServices = createAction(
  '[Customer] Load Shop Services',
  props<{
    shopId: number;
  }>()
);

export const loadShopServicesSuccess = createAction(
  '[Customer] Load Shop Services Success',
  props<{
    services: any[];
  }>()
);

export const loadShopServicesFailure = createAction(
  '[Customer] Load Shop Services Failure',
  props<{
    error: string;
  }>()
);

// Load Existing Services of Customer from Current Queue
export const loadExistingServicesOfCustomer = createAction(
  '[Customer] Load Existing Services Of Customer',
  props<{
    shopId: number;
    customerId: number;
  }>()
);

export const loadExistingServicesOfCustomerSuccess = createAction(
  '[Customer] Load Existing Services Of Customer Success',
  props<{
    existingServices: any[];
  }>()
);

export const loadExistingServicesOfCustomerFailure = createAction(
  '[Customer] Load Existing Services Of Customer Failure',
  props<{
    error: string;
  }>()
);

// Add Extra Services to Customer Queue
export const addExtraServices = createAction(
  '[Customer] Add Extra Services',
  props<{
    queueId: number;
    serviceIds: number[];
  }>()
);

export const addExtraServicesSuccess = createAction(
  '[Customer] Add Extra Services Success',
  props<{
    queue: any;
  }>()
);

export const addExtraServicesFailure = createAction(
  '[Customer] Add Extra Services Failure',
  props<{
    error: string;
  }>()
);

// Check Customer By Mobile Number
export const checkCustomerByPhone = createAction(
  '[Customer] Check Customer By Phone',
  props<{
    phone: string;
  }>()
);

export const checkCustomerByPhoneSuccess = createAction(
  '[Customer] Check Customer By Phone Success',
  props<{
    exists: boolean;
    customerId?: number;
    name?: string;
    message?: string;
  }>()
);

export const checkCustomerByPhoneFailure = createAction(
  '[Customer] Check Customer By Phone Failure',
  props<{
    error: string;
  }>()
);


// Create New Customer

export const createCustomer = createAction(
  '[Customer] Create Customer',
  props<{
    name: string;
    phone: string;
    email: string | null;
    password: string;
    role: string;
  }>()
);

export const createCustomerSuccess = createAction(
  '[Customer] Create Customer Success',
  props<{
    customer: any;
  }>()
);

export const createCustomerFailure = createAction(
  '[Customer] Create Customer Failure',
  props<{
    error: string;
  }>()
);




 // Join Queue (Walk-in / Online)
export const joinQueue = createAction(
  '[Customer] Join Queue',
  props<{
    shopId: number;
    customerId: number;
    barberId: number;
    serviceIds: number[];
    entryType: 'WALK_IN' | 'ONLINE';
  }>()
);

export const joinQueueSuccess = createAction(
  '[Customer] Join Queue Success',
  props<{
    queue: any;
  }>()
);

export const joinQueueFailure = createAction(
  '[Customer] Join Queue Failure',
  props<{
    error: string;
  }>()
);

