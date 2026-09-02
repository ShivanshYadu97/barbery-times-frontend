import { createReducer, on } from '@ngrx/store';

import {
  getShopsRequest,
  getShopsSuccess,
  getShopsFailure,
  updateShopStatusRequest,
  updateShopStatusSuccess,
  updateShopStatusFailure
} from './shop.action';


export interface ShopState {
  shops: any[];
  loading: boolean;
  error: any;
}


const initialState: ShopState = {
  shops: [],
  loading: false,
  error: null
};


export const shopReducer = createReducer(

  initialState,

  // Request
  on(
    getShopsRequest,
    updateShopStatusRequest,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),


  // Get Shops Success
  on(
    getShopsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      shops: action.payload
    })
  ),


  // Update Shop Status Success
  on(
    updateShopStatusSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      shops: state.shops.map(shop =>
        shop.id === action.payload.id
          ? action.payload
          : shop
      )
    })
  ),


  // Failure
  on(
    getShopsFailure,
    updateShopStatusFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    })
  )

);