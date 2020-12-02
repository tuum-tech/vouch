import {
    TxnActionTypes,
    EMAIL_VALIDATION_REQUEST_SUCCESS,
    GET_ALL_REQUESTS_SUCCESS,
    GET_INCOMING_REQUESTS_SUCCESS,
    SET_SELECTED_TAB_REQUESTS,
    CRED_SAVED_SUCCESS,
    REQUEST_CANCELLED_SUCCESS,
    REQUEST_APPROVED_SUCCESS,
    REQUEST_REJECTED_SUCCESS,
    NAME_VALIDATION_REQUEST_SUCCESS,
    TELEPHONE_VALIDATION_REQUEST_SUCCESS,
    GENDER_VALIDATION_REQUEST_SUCCESS,
    LOCATION_VALIDATION_REQUEST_SUCCESS,
    BIRTHDATE_VALIDATION_REQUEST_SUCCESS,
    BIRTHPLACE_VALIDATION_REQUEST_SUCCESS,
    EDUCATION_VALIDATION_REQUEST_SUCCESS,
    OCCUPATION_VALIDATION_REQUEST_SUCCESS,
    WECHAT_VALIDATION_REQUEST_SUCCESS,
    INSTAGRAM_VALIDATION_REQUEST_SUCCESS,
    FACEBOOK_VALIDATION_REQUEST_SUCCESS,
    SNAPCHAT_VALIDATION_REQUEST_SUCCESS,
    TWITTER_VALIDATION_REQUEST_SUCCESS,
    TELEGRAM_VALIDATION_REQUEST_SUCCESS,
    PAYPAL_VALIDATION_REQUEST_SUCCESS,
    ELA_VALIDATION_REQUEST_SUCCESS
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

export const nameValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(nameValidationSuccess(txn));
    callback();
})()
};

export const nameValidationSuccess = (txn: any): TxnActionTypes => ({
type: NAME_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const telephoneValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(telephoneValidationSuccess(txn));
    callback();
})()
};

export const telephoneValidationSuccess = (txn: any): TxnActionTypes => ({
type: TELEPHONE_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

////
export const genderValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(genderValidationSuccess(txn));
    callback();
})()
};

export const genderValidationSuccess = (txn: any): TxnActionTypes => ({
type: GENDER_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const locationValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(locationValidationSuccess(txn));
    callback();
})()
};

export const locationValidationSuccess = (txn: any): TxnActionTypes => ({
type: LOCATION_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const birthdateValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(birthdateValidationSuccess(txn));
    callback();
})()
};

export const birthdateValidationSuccess = (txn: any): TxnActionTypes => ({
type: BIRTHDATE_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const birthplaceValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(birthplaceValidationSuccess(txn));
    callback();
})()
};

export const birthplaceValidationSuccess = (txn: any): TxnActionTypes => ({
type: BIRTHPLACE_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const educationValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(educationValidationSuccess(txn));
    callback();
})()
};

export const educationValidationSuccess = (txn: any): TxnActionTypes => ({
type: EDUCATION_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const occupationValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(occupationValidationSuccess(txn));
    callback();
})()
};

export const occupationValidationSuccess = (txn: any): TxnActionTypes => ({
type: OCCUPATION_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const wechatValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(wechatValidationSuccess(txn));
    callback();
})()
};

export const wechatValidationSuccess = (txn: any): TxnActionTypes => ({
type: WECHAT_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const instagramValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(instagramValidationSuccess(txn));
    callback();
})()
};

export const instagramValidationSuccess = (txn: any): TxnActionTypes => ({
type: INSTAGRAM_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const facebookValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(facebookValidationSuccess(txn));
    callback();
})()
};

export const facebookValidationSuccess = (txn: any): TxnActionTypes => ({
type: FACEBOOK_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const snapchatValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(snapchatValidationSuccess(txn));
    callback();
})()
};

export const snapchatValidationSuccess = (txn: any): TxnActionTypes => ({
type: SNAPCHAT_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const twitterValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(twitterValidationSuccess(txn));
    callback();
})()
};

export const twitterValidationSuccess = (txn: any): TxnActionTypes => ({
type: TWITTER_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const telegramValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(telegramValidationSuccess(txn));
    callback();
})()
};

export const telegramValidationSuccess = (txn: any): TxnActionTypes => ({
type: TELEGRAM_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const paypalValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(paypalValidationSuccess(txn));
    callback();
})()
};

export const paypalValidationSuccess = (txn: any): TxnActionTypes => ({
type: PAYPAL_VALIDATION_REQUEST_SUCCESS,
payload: txn
});

export const elaValidation = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(elaValidationSuccess(txn));
    callback();
})()
};

export const elaValidationSuccess = (txn: any): TxnActionTypes => ({
type: ELA_VALIDATION_REQUEST_SUCCESS,
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

export const requestApproved = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(requestApprovedSuccess(txn));
    callback();
})()
};

export const requestApprovedSuccess = (txn: any): TxnActionTypes => ({
    type: REQUEST_APPROVED_SUCCESS,
    payload: txn
});

export const requestRejected = (txn: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
TxnActionTypes
> => dispatch => {
(async function(){
    dispatch(requestRejectedSuccess(txn));
    callback();
})()
};

export const requestRejectedSuccess = (txn: any): TxnActionTypes => ({
    type: REQUEST_REJECTED_SUCCESS,
    payload: txn
});

function noop() {}