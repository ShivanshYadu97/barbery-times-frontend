import { createAction, props } from '@ngrx/store';

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