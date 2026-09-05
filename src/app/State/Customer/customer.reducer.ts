import { createReducer, on } from '@ngrx/store';
import {
  loadMyQueue,
  loadMyQueueSuccess,
  loadMyQueueFailure
} from './customer.action';

export interface CustomerState {
  queue: any | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  queue: null,
  loading: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,

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
  }))
);