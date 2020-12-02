import {
  ValidationProviderState,
  ValidationProviderActionTypes,
  GET_EMAIL_VALIDATION_PROVIDERS_SUCCESS,
  GET_NAME_VALIDATION_PROVIDERS_SUCCESS,
  GET_TELEPHONE_VALIDATION_PROVIDERS_SUCCESS,
  GET_PROVIDER_SERVICES_SUCCESS,
  SET_PROVIDER_SERVICES_SUCCESS,
  GET_GENDER_VALIDATION_PROVIDERS_SUCCESS,
  GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS,
  GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS,
  GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS,
  GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS,
  GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS,
  GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS,
  GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS,
  GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS,
  GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS,
  GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS,
  GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS,
  GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS,
  GET_ELA_VALIDATION_PROVIDERS_SUCCESS
} from "./types";

const initialState: ValidationProviderState = {
  emailValidationProviders: null,
  telephoneValidationProviders: null,
  nameValidationProviders: null,
  genderValidationProviders: null,
  locationValidationProviders: null,
  birthdateValidationProviders: null,
  birthplaceValidationProviders: null,
  educationValidationProviders: null,
  occupationValidationProviders: null,
  wechatValidationProviders: null,
  instagramValidationProviders: null,
  facebookValidationProviders: null,
  snapchatValidationProviders: null,
  twitterValidationProviders: null,
  telegramValidationProviders: null,
  paypalValidationProviders: null,
  elaValidationProviders: null,
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
    case GET_NAME_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, nameValidationProviders: payload };      
    case GET_TELEPHONE_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, telephoneValidationProviders: payload };      
    case GET_GENDER_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, genderValidationProviders: payload };            
    case GET_LOCATION_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, locationValidationProviders: payload };            
    case GET_BIRTHDATE_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, birthdateValidationProviders: payload };            
    case GET_BIRTHPLACE_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, birthplaceValidationProviders: payload };            
    case GET_EDUCATION_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, educationValidationProviders: payload };            
    case GET_OCCUPATION_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, occupationValidationProviders: payload };            
    case GET_WECHAT_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, wechatValidationProviders: payload };            
    case GET_INSTAGRAM_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, instagramValidationProviders: payload };            
    case GET_FACEBOOK_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, facebookValidationProviders: payload };            
    case GET_SNAPCHAT_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, snapchatValidationProviders: payload };            
    case GET_TWITTER_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, twitterValidationProviders: payload };            
    case GET_TELEGRAM_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, telegramValidationProviders: payload };            
    case GET_PAYPAL_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, paypalValidationProviders: payload };            
    case GET_ELA_VALIDATION_PROVIDERS_SUCCESS:
      return { ...state, elaValidationProviders: payload };                    
    case GET_PROVIDER_SERVICES_SUCCESS:
      return { ...state, providerServices: payload };
    case SET_PROVIDER_SERVICES_SUCCESS:
      return { ...state, providerServices: payload };
    default:
      return state;
  }
};