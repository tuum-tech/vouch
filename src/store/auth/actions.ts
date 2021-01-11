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

        const savedUser = await Storage.get({ key: 'user' })
        let mergedUserData:any = {}

        if (savedUser && savedUser.value) {
            const savedUserData = JSON.parse(savedUser.value);
            
            if (user.id === savedUserData.id){
                // just replace old values with the new ones and keep the rest of user data intact
                mergedUserData = {...savedUserData, ...user};
            }
        }

        if(Object.keys(mergedUserData).length !== 0) {
            user = mergedUserData
        }

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

export const authCheckStatus = (callback: any = noop, callback2: any = noop): ThunkAction<
    void,
    AppState,
    null,
    AuthActionTypes
  > => dispatch => {
    (async function(){
        const user = await Storage.get({ key: 'user' })

        if (user && user.value) {
            dispatch(loginSuccess(JSON.parse(user.value)));
            callback()
          } else {
              callback2()
          }
    })()
  };
  
export type AuthCheckStatusType = typeof authCheckStatus;

function noop() {}