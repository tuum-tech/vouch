import { Plugins } from '@capacitor/core';

import {
    ValidationProviderActionTypes,
    GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS
} from "./types";
  
import { ThunkAction } from "redux-thunk";
import { AppState } from "../";

const { Storage } = Plugins;

export const getEmailValidationProviders = (emailValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'emailValidationProviders', value: JSON.stringify(emailValidationProviders)})
    dispatch(getEmailValidationProvidersSuccess(emailValidationProviders));
    callback();
})()
};

export const getEmailValidationProvidersSuccess = (emailValidationProviders: any): ValidationProviderActionTypes => ({
type: GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS,
payload: emailValidationProviders
});

function noop() {}