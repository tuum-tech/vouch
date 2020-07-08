import { Plugins } from '@capacitor/core';

import {
    TxnActionTypes,
    EMAIL_VALIDATION_REQUEST_SUCCESS,
    GET_ALL_REQUESTS_SUCCESS,
    SET_SELECTED_TAB_REQUESTS,
    CRED_SAVED_SUCCESS
} from "./types";
  
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";

const { Storage } = Plugins;

 export const emailValidation = (txn: any, callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    TxnActionTypes
> => dispatch => {
    (async function(){
        await Storage.set({ key: 'txn', value: JSON.stringify(txn)})

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
        await Storage.set({ key: 'txn', value: JSON.stringify(txn)})

        dispatch(getAllRequestsSuccess(txn));
        callback();
    })()
};

export const getAllRequestsSuccess = (txn: any): TxnActionTypes => ({
    type: GET_ALL_REQUESTS_SUCCESS,
    payload: txn
});

export const credSaved = (credentials: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    // await Storage.set({ key: 'txn', value: JSON.stringify(txn)})

    dispatch(credSavedSuccess(credentials));
    callback();
})()
};

export const credSavedSuccess = (txn: any): TxnActionTypes => ({
    type: CRED_SAVED_SUCCESS,
    payload: txn
});

export const txnCheckStatus = (callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    TxnActionTypes
  > => dispatch => {
    (async function(){
        const txn = await Storage.get({ key: 'txn' })

        if (txn && txn.value) {
            dispatch(emailValidationSuccess(JSON.parse(txn.value)));
            callback()
          }
    })()
  };
  
export type TxnCheckStatusType = typeof txnCheckStatus;

function noop() {}