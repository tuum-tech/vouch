import { Plugins } from '@capacitor/core';

import {
    ValidationProviderActionTypes,
    GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS,
    GET_NAME_VALIDATION_PROVIDERS_SUCCESS,
    GET_PHONE_VALIDATION_PROVIDERS_SUCCESS,
    GET_PROVIDER_SERVICES_SUCCESS,
    SET_PROVIDER_SERVICES_SUCCESS
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

export const getNameValidationProviders = (nameValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'nameValidationProviders', value: JSON.stringify(nameValidationProviders)})
    dispatch(getNameValidationProvidersSuccess(nameValidationProviders));
    callback();
})()
};

export const getNameValidationProvidersSuccess = (nameValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_NAME_VALIDATION_PROVIDERS_SUCCESS,
    payload: nameValidationProviders
});

export const getPhoneValidationProviders = (phoneValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'phoneValidationProviders', value: JSON.stringify(phoneValidationProviders)})
    dispatch(getPhoneValidationProvidersSuccess(phoneValidationProviders));
    callback();
})()
};

export const getPhoneValidationProvidersSuccess = (phoneValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_PHONE_VALIDATION_PROVIDERS_SUCCESS,
    payload: phoneValidationProviders
});

export const getProviderServices = (providerServices: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'providerServices', value: JSON.stringify(providerServices)})
    dispatch(getProviderServicesSuccess(providerServices));
    callback();
})()
};

export const getProviderServicesSuccess = (providerServices: any): ValidationProviderActionTypes => ({
    type: GET_PROVIDER_SERVICES_SUCCESS,
    payload: providerServices
});

export const setProviderServices = (response: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    const validationTypes = Object.keys(response.data.validation)
    const providerServices:object = {
        "id": response.data.id,
        "did": response.data.did,
        "validationTypes": validationTypes
    }

    await Storage.set({ key: 'providerServices', value: JSON.stringify(providerServices)})
    dispatch(setProviderServicesSuccess(providerServices));
    callback();
})()
};

export const setProviderServicesSuccess = (providerServices: any): ValidationProviderActionTypes => ({
    type: SET_PROVIDER_SERVICES_SUCCESS,
    payload: providerServices
});

function noop() {}