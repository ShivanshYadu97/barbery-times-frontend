import { createAction, props } from '@ngrx/store';

export const getShopsRequest = createAction('[Shop] Get Shops Request');
export const getShopsSuccess = createAction('[Shop] Get Shops Success', props<{ payload: any[] }>());
export const getShopsFailure = createAction('[Shop] Get Shops Failure', props<{ error: any }>());

export const updateShopStatusRequest = createAction('[Shop] Update Shop Status Request', props<{ shopId: number; isOpen: boolean }>());
export const updateShopStatusSuccess = createAction('[Shop] Update Shop Status Success', props<{ payload: any }>());
export const updateShopStatusFailure = createAction('[Shop] Update Shop Status Failure', props<{ error: any }>());
