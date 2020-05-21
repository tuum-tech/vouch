import { Plugins } from '@capacitor/core';

import {
    AuthActionTypes,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "./types";
  
import { ThunkAction } from "redux-thunk";
import { AppState } from "../";

const { Storage } = Plugins;

 export const login = (user: any, callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
> => dispatch => {
    (async function(){
        await Storage.set({ key: 'user', value: JSON.stringify(user)})
        dispatch(loginSuccess(user));
        callback();
    })()
};
  
export const loginSuccess = (user: any): AuthActionTypes => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const logout = (callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
> => dispatch => {
    (async function(){
        await Storage.clear()
        dispatch(logoutSuccess());
        callback()
    })()
};

export const logoutSuccess = (): AuthActionTypes => ({
    type: LOGOUT_SUCCESS
});

export const authCheckStatus = (callback: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
  > => dispatch => {
    (async function(){
        const user = await Storage.get({ key: 'user' })

        if (user && user.value) {
            // TOOD is user credential expired ?
            dispatch(loginSuccess(JSON.parse(user.value)));
            callback()
          }
    })()
  };
  
export type AuthCheckStatusType = typeof authCheckStatus;

function noop() {}