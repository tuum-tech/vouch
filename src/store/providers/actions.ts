import { Plugins } from '@capacitor/core';

import {
    ValidationProviderActionTypes,
    GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS,
    GET_NAME_VALIDATION_PROVIDERS_SUCCESS,
    GET_TELEPHONE_VALIDATION_PROVIDERS_SUCCESS,
    GET_GENDER_VALIDATION_PROVIDERS_SUCCESS,
    GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS,
    GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS,
    GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS,
    GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS,
    GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS,
    GET_WEBSITE_VALIDATION_PROVIDERS_SUCCESS,
    GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS,
    GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS,
    GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS,
    GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS,
    GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS,
    GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS,
    GET_TWITCH_VALIDATION_PROVIDERS_SUCCESS,
    GET_WEIBO_VALIDATION_PROVIDERS_SUCCESS,
    GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS,
    GET_ELA_VALIDATION_PROVIDERS_SUCCESS,
    GET_PROVIDER_SERVICES_SUCCESS,
    SET_PROVIDER_SERVICES_SUCCESS
} from "./types";
  
import { ThunkAction } from "redux-thunk";
import { AppState } from "../";

const { Storage } = Plugins;


// Email
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


// Name
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


// Phone
export const getTelephoneValidationProviders = (telephoneValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'telephoneValidationProviders', value: JSON.stringify(telephoneValidationProviders)})
    dispatch(getTelephoneValidationProvidersSuccess(telephoneValidationProviders));
    callback();
})()
};

export const getTelephoneValidationProvidersSuccess = (telephoneValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_TELEPHONE_VALIDATION_PROVIDERS_SUCCESS,
    payload: telephoneValidationProviders
});


// Gender
export const getGenderValidationProviders = (genderValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'genderValidationProviders', value: JSON.stringify(genderValidationProviders)})
    dispatch(getGenderValidationProvidersSuccess(genderValidationProviders));
    callback();
})()
};

export const getGenderValidationProvidersSuccess = (genderValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_GENDER_VALIDATION_PROVIDERS_SUCCESS,
    payload: genderValidationProviders
});


// Location
export const getLocationValidationProviders = (locationValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'locationValidationProviders', value: JSON.stringify(locationValidationProviders)})
    dispatch(getLocationValidationProvidersSuccess(locationValidationProviders));
    callback();
})()
};

export const getLocationValidationProvidersSuccess = (locationValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS,
    payload: locationValidationProviders
});


// Birth date
export const getBirthdateValidationProviders = (birthdateValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'birthdateValidationProviders', value: JSON.stringify(birthdateValidationProviders)})
    dispatch(getBirthdateValidationProvidersSuccess(birthdateValidationProviders));
    callback();
})()
};

export const getBirthdateValidationProvidersSuccess = (birthdateValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS,
    payload: birthdateValidationProviders
});


// Birth place
export const getBirthplaceValidationProviders = (birthplaceValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'birthplaceValidationProviders', value: JSON.stringify(birthplaceValidationProviders)})
    dispatch(getBirthplaceValidationProvidersSuccess(birthplaceValidationProviders));
    callback();
})()
};

export const getBirthplaceValidationProvidersSuccess = (birthplaceValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS,
    payload: birthplaceValidationProviders
});


// Education
export const getEducationValidationProviders = (educationValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'educationValidationProviders', value: JSON.stringify(educationValidationProviders)})
    dispatch(getEducationValidationProvidersSuccess(educationValidationProviders));
    callback();
})()
};

export const getEducationValidationProvidersSuccess = (educationValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS,
    payload: educationValidationProviders
});


// Occupation
export const getOccupationValidationProviders = (occupationValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'occupationValidationProviders', value: JSON.stringify(occupationValidationProviders)})
    dispatch(getOccupationValidationProvidersSuccess(occupationValidationProviders));
    callback();
})()
};

export const getOccupationValidationProvidersSuccess = (occupationValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS,
    payload: occupationValidationProviders
});

// Website
export const getWebsiteValidationProviders = (websiteValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'websiteValidationProviders', value: JSON.stringify(websiteValidationProviders)})
    dispatch(getWebsiteValidationProvidersSuccess(websiteValidationProviders));
    callback();
})()
};

export const getWebsiteValidationProvidersSuccess = (websiteValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_WEBSITE_VALIDATION_PROVIDERS_SUCCESS,
    payload: websiteValidationProviders
});

// Wechat
export const getWechatValidationProviders = (wechatValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'wechatValidationProviders', value: JSON.stringify(wechatValidationProviders)})
    dispatch(getWechatValidationProvidersSuccess(wechatValidationProviders));
    callback();
})()
};

export const getWechatValidationProvidersSuccess = (wechatValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS,
    payload: wechatValidationProviders
});


// Instagram
export const getInstagramValidationProviders = (instagramValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'instagramValidationProviders', value: JSON.stringify(instagramValidationProviders)})
    dispatch(getInstagramValidationProvidersSuccess(instagramValidationProviders));
    callback();
})()
};

export const getInstagramValidationProvidersSuccess = (instagramValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS,
    payload: instagramValidationProviders
});


// Facebook
export const getFacebookValidationProviders = (facebookValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'facebookValidationProviders', value: JSON.stringify(facebookValidationProviders)})
    dispatch(getFacebookValidationProvidersSuccess(facebookValidationProviders));
    callback();
})()
};

export const getFacebookValidationProvidersSuccess = (facebookValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS,
    payload: facebookValidationProviders
});


// Snapchat
export const getSnapchatValidationProviders = (snapchatValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'snapchatValidationProviders', value: JSON.stringify(snapchatValidationProviders)})
    dispatch(getSnapchatValidationProvidersSuccess(snapchatValidationProviders));
    callback();
})()
};

export const getSnapchatValidationProvidersSuccess = (snapchatValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS,
    payload: snapchatValidationProviders
});


// Twitter
export const getTwitterValidationProviders = (twitterValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'twitterValidationProviders', value: JSON.stringify(twitterValidationProviders)})
    dispatch(getTwitterValidationProvidersSuccess(twitterValidationProviders));
    callback();
})()
};

export const getTwitterValidationProvidersSuccess = (twitterValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS,
    payload: twitterValidationProviders
});


// Telegram
export const getTelegramValidationProviders = (telegramValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'telegramValidationProviders', value: JSON.stringify(telegramValidationProviders)})
    dispatch(getTelegramValidationProvidersSuccess(telegramValidationProviders));
    callback();
})()
};

export const getTelegramValidationProvidersSuccess = (telegramValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS,
    payload: telegramValidationProviders
});

// Twitch
export const getTwitchValidationProviders = (twitchValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'twitchValidationProviders', value: JSON.stringify(twitchValidationProviders)})
    dispatch(getTwitchValidationProvidersSuccess(twitchValidationProviders));
    callback();
})()
};

export const getTwitchValidationProvidersSuccess = (twitchValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_TWITCH_VALIDATION_PROVIDERS_SUCCESS,
    payload: twitchValidationProviders
});

// Weibo
export const getWeiboValidationProviders = (weiboValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'weiboValidationProviders', value: JSON.stringify(weiboValidationProviders)})
    dispatch(getWeiboValidationProvidersSuccess(weiboValidationProviders));
    callback();
})()
};

export const getWeiboValidationProvidersSuccess = (weiboValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_WEIBO_VALIDATION_PROVIDERS_SUCCESS,
    payload: weiboValidationProviders
});

// Paypal
export const getPaypalValidationProviders = (paypalValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'paypalValidationProviders', value: JSON.stringify(paypalValidationProviders)})
    dispatch(getPaypalValidationProvidersSuccess(paypalValidationProviders));
    callback();
})()
};

export const getPaypalValidationProvidersSuccess = (paypalValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS,
    payload: paypalValidationProviders
});


// ELA
export const getElaValidationProviders = (elaValidationProviders: any, callback: any = noop): ThunkAction<
void,
AppState,
null,
ValidationProviderActionTypes
> => dispatch => {
(async function(){
    await Storage.set({ key: 'elaValidationProviders', value: JSON.stringify(elaValidationProviders)})
    dispatch(getElaValidationProvidersSuccess(elaValidationProviders));
    callback();
})()
};

export const getElaValidationProvidersSuccess = (elaValidationProviders: any): ValidationProviderActionTypes => ({
    type: GET_ELA_VALIDATION_PROVIDERS_SUCCESS,
    payload: elaValidationProviders
});  


// Self services as a validator
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