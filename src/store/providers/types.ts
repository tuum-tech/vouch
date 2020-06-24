export const GET_EMAIL_VALIDATION_PROVIDERS = "GET_EMAIL_VALIDATION_PROVIDERS";
export const GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS = "GET_EMAIL_VALIDATION_PROVIDERSSUCCESS";

export interface ValidationProviderState {
  emailValidationProviders: any;
  phoneValidationProviders: any;
  nameValidationProviders: any;
}

interface GetEmailValidationProvidersAction {
  type: typeof GET_EMAIL_VALIDATION_PROVIDERS;
  payload?: any
}  

interface GetEmailValidationProvidersSuccessAction {
  type: typeof GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS;
  payload?: any
}  

export type ValidationProviderActionTypes =
  | GetEmailValidationProvidersAction
  | GetEmailValidationProvidersSuccessAction