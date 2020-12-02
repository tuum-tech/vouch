export const GET_EMAIL_VALIDATION_PROVIDERS = "GET_EMAIL_VALIDATION_PROVIDERS";
export const GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS = "GET_EMAIL_VALIDATION_PROVIDERSSUCCESS";

export const GET_NAME_VALIDATION_PROVIDERS = "GET_NAME_VALIDATION_PROVIDERS";
export const GET_NAME_VALIDATION_PROVIDERS_SUCCESS = "GET_NAME_VALIDATION_PROVIDERSSUCCESS";

export const GET_TELEPHONE_VALIDATION_PROVIDERS = "GET_TELEPHONE_VALIDATION_PROVIDERS";
export const GET_TELEPHONE_VALIDATION_PROVIDERS_SUCCESS = "GET_TELEPHONE_VALIDATION_PROVIDERSSUCCESS";

export const GET_GENDER_VALIDATION_PROVIDERS = "GET_GENDER_VALIDATION_PROVIDERS";
export const GET_GENDER_VALIDATION_PROVIDERS_SUCCESS = "GET_GENDER_VALIDATION_PROVIDERS_SUCCESS";

export const GET_LOCATION_VALIDATION_PROVIDERS = "GET_LOCATION_VALIDATION_PROVIDERS";
export const GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS = "GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS";

export const GET_BIRTHDATE_VALIDATION_PROVIDERS = "GET_BIRTHDATE_VALIDATION_PROVIDERS";
export const GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS = "GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS";

export const GET_BIRTHPLACE_VALIDATION_PROVIDERS = "GET_BIRTHPLACE_VALIDATION_PROVIDERS";
export const GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS = "GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS";

export const GET_EDUCATION_VALIDATION_PROVIDERS = "GET_EDUCATION_VALIDATION_PROVIDERS";
export const GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS = "GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS";

export const GET_OCCUPATION_VALIDATION_PROVIDERS = "GET_OCCUPATION_VALIDATION_PROVIDERS";
export const GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS = "GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS";

export const GET_WECHAT_VALIDATION_PROVIDERS = "GET_WECHAT_VALIDATION_PROVIDERS";
export const GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS = "GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS";

export const GET_INSTAGRAM_VALIDATION_PROVIDERS = "GET_INSTAGRAM_VALIDATION_PROVIDERS";
export const GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS = "GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS";

export const GET_FACEBOOK_VALIDATION_PROVIDERS = "GET_FACEBOOK_VALIDATION_PROVIDERS";
export const GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS = "GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS";

export const GET_SNAPCHAT_VALIDATION_PROVIDERS = "GET_SNAPCHAT_VALIDATION_PROVIDERS";
export const GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS = "GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS";

export const GET_TWITTER_VALIDATION_PROVIDERS = "GET_TWITTER_VALIDATION_PROVIDERS";
export const GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS = "GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS";

export const GET_TELEGRAM_VALIDATION_PROVIDERS = "GET_TELEGRAM_VALIDATION_PROVIDERS";
export const GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS = "GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS";

export const GET_PAYPAL_VALIDATION_PROVIDERS = "GET_PAYPAL_VALIDATION_PROVIDERS";
export const GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS = "GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS";

export const GET_ELA_VALIDATION_PROVIDERS = "GET_ELA_VALIDATION_PROVIDERS";
export const GET_ELA_VALIDATION_PROVIDERS_SUCCESS = "GET_ELA_VALIDATION_PROVIDERS_SUCCESS";

export const GET_PROVIDER_SERVICES = "GET_PROVIDER_SERVICES";
export const GET_PROVIDER_SERVICES_SUCCESS = "GET_PROVIDER_SERVICES_SUCCESS";

export const SET_PROVIDER_SERVICES = "SET_PROVIDER_SERVICES";
export const SET_PROVIDER_SERVICES_SUCCESS = "SET_PROVIDER_SERVICES_SUCCESS";

export interface ValidationProviderState {
  [key: string]: any;
// emailValidationProviders
// telephoneValidationProviders
// nameValidationProviders
// genderValidationProviders
// locationValidationProviders
// birthdateValidationProviders
// birthplaceValidationProviders
// educationValidationProviders
// occupationValidationProviders
// wechatValidationProviders
// instagramValidationProviders
// facebookValidationProviders
// snapchatValidationProviders
// twitterValidationProviders
// telegramValidationProviders
// paypalValidationProviders
// elaValidationProviders
// providerServices
}

interface GetEmailValidationProvidersAction {
  type: typeof GET_EMAIL_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetEmailValidationProvidersSuccessAction {
  type: typeof GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}  

interface GetNameValidationProvidersAction {
  type: typeof GET_NAME_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetNameValidationProvidersSuccessAction {
  type: typeof GET_NAME_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
} 

interface GetTelephoneValidationProvidersAction {
  type: typeof GET_TELEPHONE_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetTelephoneValidationProvidersSuccessAction {
  type: typeof GET_TELEPHONE_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
} 

interface GetGenderValidationProvidersAction {
  type: typeof GET_GENDER_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetGenderValidationProvidersSuccessAction {
  type: typeof GET_GENDER_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetLocationValidationProvidersAction {
  type: typeof GET_LOCATION_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetLocationValidationProvidersSuccessAction {
  type: typeof GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetBirthdateValidationProvidersAction {
  type: typeof GET_BIRTHDATE_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetBirthdateValidationProvidersSuccessAction {
  type: typeof GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetBirthplaceValidationProvidersAction {
  type: typeof GET_BIRTHPLACE_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetBirthplaceValidationProvidersSuccessAction {
  type: typeof GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetEducationValidationProvidersAction {
  type: typeof GET_EDUCATION_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetEducationValidationProvidersSuccessAction {
  type: typeof GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetOccupationValidationProvidersAction {
  type: typeof GET_OCCUPATION_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetOccupationValidationProvidersSuccessAction {
  type: typeof GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetWechatValidationProvidersAction {
  type: typeof GET_WECHAT_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetWechatValidationProvidersSuccessAction {
  type: typeof GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetInstagramValidationProvidersAction {
  type: typeof GET_INSTAGRAM_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetInstagramValidationProvidersSuccessAction {
  type: typeof GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetFacebookValidationProvidersAction {
  type: typeof GET_FACEBOOK_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetFacebookValidationProvidersSuccessAction {
  type: typeof GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetSnapchatValidationProvidersAction {
  type: typeof GET_SNAPCHAT_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetSnapchatValidationProvidersSuccessAction {
  type: typeof GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetTwitterValidationProvidersAction {
  type: typeof GET_TWITTER_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetTwitterValidationProvidersSuccessAction {
  type: typeof GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetTelegramValidationProvidersAction {
  type: typeof GET_TELEGRAM_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetTelegramValidationProvidersSuccessAction {
  type: typeof GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetPaypalValidationProvidersAction {
  type: typeof GET_PAYPAL_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetPaypalValidationProvidersSuccessAction {
  type: typeof GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetElaValidationProvidersAction {
  type: typeof GET_ELA_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetElaValidationProvidersSuccessAction {
  type: typeof GET_ELA_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}

interface GetProviderServicesAction {
  type: typeof GET_PROVIDER_SERVICES;
  payload?: any
}  

interface GetProviderServicesSuccessAction {
  type: typeof GET_PROVIDER_SERVICES_SUCCESS;
  payload?: any
}  

interface SetProviderServicesAction {
  type: typeof SET_PROVIDER_SERVICES;
  payload?: any
}  

interface SetProviderServicesSuccessAction {
  type: typeof SET_PROVIDER_SERVICES_SUCCESS;
  payload?: any
}  

export type ValidationProviderActionTypes =
  | GetEmailValidationProvidersAction
  | GetEmailValidationProvidersSuccessAction
  | GetNameValidationProvidersAction
  | GetNameValidationProvidersSuccessAction
  | GetTelephoneValidationProvidersAction
  | GetTelephoneValidationProvidersSuccessAction
  | GetGenderValidationProvidersAction
  | GetGenderValidationProvidersSuccessAction
  | GetLocationValidationProvidersAction
  | GetLocationValidationProvidersSuccessAction
  | GetBirthdateValidationProvidersAction
  | GetBirthdateValidationProvidersSuccessAction
  | GetBirthplaceValidationProvidersAction
  | GetBirthplaceValidationProvidersSuccessAction
  | GetEducationValidationProvidersAction
  | GetEducationValidationProvidersSuccessAction
  | GetOccupationValidationProvidersAction
  | GetOccupationValidationProvidersSuccessAction
  | GetWechatValidationProvidersAction
  | GetWechatValidationProvidersSuccessAction
  | GetInstagramValidationProvidersAction
  | GetInstagramValidationProvidersSuccessAction
  | GetFacebookValidationProvidersAction
  | GetFacebookValidationProvidersSuccessAction
  | GetSnapchatValidationProvidersAction
  | GetSnapchatValidationProvidersSuccessAction
  | GetTwitterValidationProvidersAction
  | GetTwitterValidationProvidersSuccessAction
  | GetTelegramValidationProvidersAction
  | GetTelegramValidationProvidersSuccessAction
  | GetPaypalValidationProvidersAction
  | GetPaypalValidationProvidersSuccessAction
  | GetElaValidationProvidersAction
  | GetElaValidationProvidersSuccessAction
  | GetProviderServicesAction
  | GetProviderServicesSuccessAction  
  | SetProviderServicesAction
  | SetProviderServicesSuccessAction    