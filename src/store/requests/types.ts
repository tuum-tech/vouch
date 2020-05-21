export const EMAIL_VALIDATION_REQUEST = "EMAIL_VALIDATION_REQUEST";
export const EMAIL_VALIDATION_REQUEST_SUCCESS = "EMAIL_VALIDATION_REQUEST_SUCCESS";

export const GET_ALL_REQUESTS = "GET_ALL_REQUESTS";
export const GET_ALL_REQUESTS_SUCCESS = "GET_ALL_REQUESTS_SUCCESS";

export interface TxnState {
  txn: any;
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

export type TxnActionTypes =
    | EmailValidationRequestAction
    | EmailValidationRequestSuccessAction
    | GetAllRequestsAction
    | GetAllRequestsSuccessAction