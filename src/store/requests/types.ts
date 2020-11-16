export const EMAIL_VALIDATION_REQUEST = "EMAIL_VALIDATION_REQUEST";
export const EMAIL_VALIDATION_REQUEST_SUCCESS = "EMAIL_VALIDATION_REQUEST_SUCCESS";

export const NAME_VALIDATION_REQUEST = "NAME_VALIDATION_REQUEST";
export const NAME_VALIDATION_REQUEST_SUCCESS = "NAME_VALIDATION_REQUEST_SUCCESS";

export const PHONE_VALIDATION_REQUEST = "PHONE_VALIDATION_REQUEST";
export const PHONE_VALIDATION_REQUEST_SUCCESS = "PHONE_VALIDATION_REQUEST_SUCCESS";

export const GET_ALL_REQUESTS = "GET_ALL_REQUESTS";
export const GET_ALL_REQUESTS_SUCCESS = "GET_ALL_REQUESTS_SUCCESS";

export const GET_INCOMING_REQUESTS = "GET_INCOMING_REQUESTS";
export const GET_INCOMING_REQUESTS_SUCCESS = "GET_INCOMING_REQUESTS_SUCCESS";

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const SET_SELECTED_TAB_REQUESTS = "SET_SELECTED_TAB_REQUESTS";

export const CRED_SAVED = "CRED_SAVED";
export const CRED_SAVED_SUCCESS = "CRED_SAVED_SUCCESS";

export const REQUEST_CANCELLED = "REQUEST_CANCELLED";
export const REQUEST_CANCELLED_SUCCESS = "REQUEST_CANCELLED_SUCCESS";

export const REQUEST_APPROVED = "REQUEST_APPROVED";
export const REQUEST_APPROVED_SUCCESS = "REQUEST_APPROVED_SUCCESS";

export const REQUEST_REJECTED = "REQUEST_REJECTED";
export const REQUEST_REJECTED_SUCCESS = "REQUEST_REJECTED_SUCCESS";

export interface TxnState {
  txn: any;
  selected_tab_txn: any;
  selected_tab_name: any;
  incoming_txn: any;
  pending_txn: any;
  approved_txn: any;
  rejected_txn: any;
  expired_txn: any;
  cancelled_txn: any;
  notification: any;
}

interface EmailValidationRequestAction {
    type: typeof EMAIL_VALIDATION_REQUEST;
    payload?: any
}

interface EmailValidationRequestSuccessAction {
    type: typeof EMAIL_VALIDATION_REQUEST_SUCCESS;
    payload?: any
}  

interface NameValidationRequestAction {
    type: typeof NAME_VALIDATION_REQUEST;
    payload?: any
}

interface NameValidationRequestSuccessAction {
    type: typeof NAME_VALIDATION_REQUEST_SUCCESS;
    payload?: any
}  

interface PhoneValidationRequestAction {
    type: typeof PHONE_VALIDATION_REQUEST;
    payload?: any
}

interface PhoneValidationRequestSuccessAction {
    type: typeof PHONE_VALIDATION_REQUEST_SUCCESS;
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

interface GetIncomingRequestsAction {
    type: typeof GET_INCOMING_REQUESTS;
    payload?: any
}  

interface GetIncomingRequestsSuccessAction {
    type: typeof GET_INCOMING_REQUESTS_SUCCESS;
    payload?: any
} 

interface SetSelectedTabRequestsAction {
    type: typeof SET_SELECTED_TAB_REQUESTS;
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

interface CredSavedAction {
    type: typeof CRED_SAVED;
    payload?: any
}

interface CredSavedSuccessAction {
    type: typeof CRED_SAVED_SUCCESS;
    payload?: any
}  

interface RequestCancelledAction {
    type: typeof REQUEST_CANCELLED;
    payload?: any
}

interface RequestCancelledSuccessAction {
    type: typeof REQUEST_CANCELLED_SUCCESS;
    payload?: any
}  

interface RequestApprovedAction {
    type: typeof REQUEST_APPROVED;
    payload?: any
}

interface RequestApprovedSuccessAction {
    type: typeof REQUEST_APPROVED_SUCCESS;
    payload?: any
}  

interface RequestRejectedAction {
    type: typeof REQUEST_REJECTED;
    payload?: any
}

interface RequestRejectedSuccessAction {
    type: typeof REQUEST_REJECTED_SUCCESS;
    payload?: any
}  

export type TxnActionTypes =
    | EmailValidationRequestAction
    | EmailValidationRequestSuccessAction
    | NameValidationRequestAction
    | NameValidationRequestSuccessAction
    | PhoneValidationRequestAction
    | PhoneValidationRequestSuccessAction    
    | GetAllRequestsAction
    | GetAllRequestsSuccessAction
    | GetIncomingRequestsAction
    | GetIncomingRequestsSuccessAction
    | SetSelectedTabRequestsAction
    | ShowNotificationAction
    | HideNotificationAction
    | CredSavedAction
    | CredSavedSuccessAction
    | RequestCancelledAction
    | RequestCancelledSuccessAction
    | RequestApprovedAction
    | RequestApprovedSuccessAction
    | RequestRejectedAction
    | RequestRejectedSuccessAction        