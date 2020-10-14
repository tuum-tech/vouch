import {
    TxnActionTypes,
    EMAIL_VALIDATION_REQUEST_SUCCESS,
    GET_ALL_REQUESTS_SUCCESS,
    GET_INCOMING_REQUESTS_SUCCESS,
    SET_SELECTED_TAB_REQUESTS,
    CRED_SAVED_SUCCESS,
    REQUEST_CANCELLED_SUCCESS
} from "./types";
  
import { ThunkAction } from "redux-thunk";
import { AppState } from "../";
import { Storage } from "@capacitor/core";

 export const emailValidation = (txn: any, callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    TxnActionTypes
> => dispatch => {
    (async function(){
        dispatch(emailValidationSuccess(txn));
        callback();
    })()
};
  
export const emailValidationSuccess = (txn: any): TxnActionTypes => ({
    type: EMAIL_VALIDATION_REQUEST_SUCCESS,
    payload: txn
});

export const setSelectedTabRequests = (txn: any): TxnActionTypes => ({
    type: SET_SELECTED_TAB_REQUESTS,
    payload: txn
});

export const showNotification = (text: any): TxnActionTypes => ({
    type: 'SHOW_NOTIFICATION', 
    payload: text
})

export const hideNotification = (): TxnActionTypes => ({
    type: 'HIDE_NOTIFICATION'
})

export const getAllRequests = (txn: any, callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    TxnActionTypes
> => dispatch => {
    (async function(){
        dispatch(getAllRequestsSuccess(txn));
        callback();
    })()
};

export const getAllRequestsSuccess = (txn: any): TxnActionTypes => ({
    type: GET_ALL_REQUESTS_SUCCESS,
    payload: txn
});

export const getIncomingRequests = (txn: any, callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    TxnActionTypes
> => dispatch => {
    (async function(){
        dispatch(getIncomingRequestsSuccess(txn));
        callback();
    })()
};

export const getIncomingRequestsSuccess = (txn: any): TxnActionTypes => ({
    type: GET_INCOMING_REQUESTS_SUCCESS,
    payload: txn
});

export const credSaved = (credentials: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(credSavedSuccess(credentials));
    callback();
})()
};

export const credSavedSuccess = (txn: any): TxnActionTypes => ({
    type: CRED_SAVED_SUCCESS,
    payload: txn
});

export const requestCancelled = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(requestCancelledSuccess(txn));

    const requestIds = await Storage.get({ key: 'pendingRequests' });
    if(requestIds && requestIds.value){
      let remainingPendingRequests = JSON.parse(requestIds.value);

      remainingPendingRequests = remainingPendingRequests.filter((value:any) => value !== txn.data.id)
      await Storage.set({ key: 'pendingRequests', value: JSON.stringify(remainingPendingRequests) });                      
    } 

    callback();
})()
};

export const requestCancelledSuccess = (txn: any): TxnActionTypes => ({
    type: REQUEST_CANCELLED_SUCCESS,
    payload: txn
});

function noop() {}