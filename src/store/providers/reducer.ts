import {
  ValidationProviderState,
  ValidationProviderActionTypes,
  GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS
} from "./types";

const initialState: ValidationProviderState = {
  emailValidationProviders: null,
  phoneValidationProviders: null,
  nameValidationProviders: null
};

export const validationProviderReducer = (
  state = initialState,
  action: ValidationProviderActionTypes
): ValidationProviderState => {
  const { payload, type } = action;

  switch (type) {
    case GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, emailValidationProviders: payload };
    default:
      return state;
  }
};