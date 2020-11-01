export const GET_EMAIL_VALIDATION_PROVIDERS = "GET_EMAIL_VALIDATION_PROVIDERS";
export const GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS = "GET_EMAIL_VALIDATION_PROVIDERSSUCCESS";

export const GET_PROVIDER_SERVICES = "GET_PROVIDER_SERVICES";
export const GET_PROVIDER_SERVICES_SUCCESS = "GET_PROVIDER_SERVICES_SUCCESS";

export const SET_PROVIDER_SERVICES = "SET_PROVIDER_SERVICES";
export const SET_PROVIDER_SERVICES_SUCCESS = "SET_PROVIDER_SERVICES_SUCCESS";

export interface ValidationProviderState {
  emailValidationProviders: any;
  phoneValidationProviders: any;
  nameValidationProviders: any;
  providerServices:any;
}

interface GetEmailValidationProvidersAction {
  type: typeof GET_EMAIL_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetEmailValidationProvidersSuccessAction {
  type: typeof GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS;
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
  | GetProviderServicesAction
  | GetProviderServicesSuccessAction  
  | SetProviderServicesAction
  | SetProviderServicesSuccessAction    