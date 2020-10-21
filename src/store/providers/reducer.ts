import {
  ValidationProviderState,
  ValidationProviderActionTypes,
  GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS,
  GET_PROVIDER_SERVICES_SUCCESS,
  SET_PROVIDER_SERVICES_SUCCESS
} from "./types";

const initialState: ValidationProviderState = {
  emailValidationProviders: null,
  phoneValidationProviders: null,
  nameValidationProviders: null,
  providerServices:null
};

export const validationProviderReducer = (
  state = initialState,
  action: ValidationProviderActionTypes
): ValidationProviderState => {
  const { payload, type } = action;

  switch (type) {
    case GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, emailValidationProviders: payload };
    case GET_PROVIDER_SERVICES_SUCCESS:
      return { ...state, providerServices: payload };
    case SET_PROVIDER_SERVICES_SUCCESS:
      return { ...state, providerServices: payload };
    default:
      return state;
  }
};