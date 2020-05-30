export const EMAIL_VALIDATION_REQUEST = "EMAIL_VALIDATION_REQUEST";
export const EMAIL_VALIDATION_REQUEST_SUCCESS = "EMAIL_VALIDATION_REQUEST_SUCCESS";

export const GET_ALL_REQUESTS = "GET_ALL_REQUESTS";
export const GET_ALL_REQUESTS_SUCCESS = "GET_ALL_REQUESTS_SUCCESS";

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export interface TxnState {
  txn: any;
  newTxnAdded: boolean;
}

interface EmailValidationRequestAction {
    type: typeof EMAIL_VALIDATION_REQUEST;
    payload?: any
}

interface EmailValidationRequestSuccessAction {
    type: typeof EMAIL_VALIDATION_REQUEST_SUCCESS;
    payload?: any
}  

interface GetAllRequestsAction {
    type: typeof GET_ALL_REQUESTS;
    payload?: any
}  

interface GetAllRequestsSuccessAction {
    type: typeof GET_ALL_REQUESTS_SUCCESS;
    payload?: any
}  

interface ShowNotificationAction {
    type: typeof SHOW_NOTIFICATION;
    payload?: any
}

interface HideNotificationAction {
    type: typeof HIDE_NOTIFICATION;
    payload?: any    
}

export type TxnActionTypes =
    | EmailValidationRequestAction
    | EmailValidationRequestSuccessAction
    | GetAllRequestsAction
    | GetAllRequestsSuccessAction
    | ShowNotificationAction
    | HideNotificationAction    