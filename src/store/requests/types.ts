export const EMAIL_VALIDATION_REQUEST = "EMAIL_VALIDATION_REQUEST";
export const EMAIL_VALIDATION_REQUEST_SUCCESS = "EMAIL_VALIDATION_REQUEST_SUCCESS";

export const NAME_VALIDATION_REQUEST = "NAME_VALIDATION_REQUEST";
export const NAME_VALIDATION_REQUEST_SUCCESS = "NAME_VALIDATION_REQUEST_SUCCESS";

export const TELEPHONE_VALIDATION_REQUEST = "TELEPHONE_VALIDATION_REQUEST";
export const TELEPHONE_VALIDATION_REQUEST_SUCCESS = "TELEPHONE_VALIDATION_REQUEST_SUCCESS";

export const GENDER_VALIDATION_REQUEST = "GENDER_VALIDATION_REQUEST";
export const GENDER_VALIDATION_REQUEST_SUCCESS = "GENDER_VALIDATION_REQUEST_SUCCESS";

export const LOCATION_VALIDATION_REQUEST = "LOCATION_VALIDATION_REQUEST";
export const LOCATION_VALIDATION_REQUEST_SUCCESS = "LOCATION_VALIDATION_REQUEST_SUCCESS";

export const BIRTHDATE_VALIDATION_REQUEST = "BIRTHDATE_VALIDATION_REQUEST";
export const BIRTHDATE_VALIDATION_REQUEST_SUCCESS = "BIRTHDATE_VALIDATION_REQUEST_SUCCESS";

export const BIRTHPLACE_VALIDATION_REQUEST = "BIRTHPLACE_VALIDATION_REQUEST";
export const BIRTHPLACE_VALIDATION_REQUEST_SUCCESS = "BIRTHPLACE_VALIDATION_REQUEST_SUCCESS";

export const EDUCATION_VALIDATION_REQUEST = "EDUCATION_VALIDATION_REQUEST";
export const EDUCATION_VALIDATION_REQUEST_SUCCESS = "EDUCATION_VALIDATION_REQUEST_SUCCESS";

export const OCCUPATION_VALIDATION_REQUEST = "OCCUPATION_VALIDATION_REQUEST";
export const OCCUPATION_VALIDATION_REQUEST_SUCCESS = "OCCUPATION_VALIDATION_REQUEST_SUCCESS";

export const WECHAT_VALIDATION_REQUEST = "WECHAT_VALIDATION_REQUEST";
export const WECHAT_VALIDATION_REQUEST_SUCCESS = "WECHAT_VALIDATION_REQUEST_SUCCESS";

export const INSTAGRAM_VALIDATION_REQUEST = "INSTAGRAM_VALIDATION_REQUEST";
export const INSTAGRAM_VALIDATION_REQUEST_SUCCESS = "INSTAGRAM_VALIDATION_REQUEST_SUCCESS";

export const FACEBOOK_VALIDATION_REQUEST = "FACEBOOK_VALIDATION_REQUEST";
export const FACEBOOK_VALIDATION_REQUEST_SUCCESS = "FACEBOOK_VALIDATION_REQUEST_SUCCESS";

export const SNAPCHAT_VALIDATION_REQUEST = "SNAPCHAT_VALIDATION_REQUEST";
export const SNAPCHAT_VALIDATION_REQUEST_SUCCESS = "SNAPCHAT_VALIDATION_REQUEST_SUCCESS";

export const TWITTER_VALIDATION_REQUEST = "TWITTER_VALIDATION_REQUEST";
export const TWITTER_VALIDATION_REQUEST_SUCCESS = "TWITTER_VALIDATION_REQUEST_SUCCESS";

export const TELEGRAM_VALIDATION_REQUEST = "TELEGRAM_VALIDATION_REQUEST";
export const TELEGRAM_VALIDATION_REQUEST_SUCCESS = "TELEGRAM_VALIDATION_REQUEST_SUCCESS";

export const PAYPAL_VALIDATION_REQUEST = "PAYPAL_VALIDATION_REQUEST";
export const PAYPAL_VALIDATION_REQUEST_SUCCESS = "PAYPAL_VALIDATION_REQUEST_SUCCESS";

export const ELA_VALIDATION_REQUEST = "ELA_VALIDATION_REQUEST";
export const ELA_VALIDATION_REQUEST_SUCCESS = "ELA_VALIDATION_REQUEST_SUCCESS";

export const GET_ALL_REQUESTS = "GET_ALL_REQUESTS";
export const GET_ALL_REQUESTS_SUCCESS = "GET_ALL_REQUESTS_SUCCESS";

export const GET_INCOMING_REQUESTS = "GET_INCOMING_REQUESTS";
export const GET_INCOMING_REQUESTS_SUCCESS = "GET_INCOMING_REQUESTS_SUCCESS";

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const SET_SELECTED_TAB_REQUESTS = "SET_SELECTED_TAB_REQUESTS";

export const CRED_SAVED = "CRED_SAVED";
export const CRED_SAVED_SUCCESS = "CRED_SAVED_SUCCESS";

export const REQUEST_CANCELLED = "REQUEST_CANCELLED";
export const REQUEST_CANCELLED_SUCCESS = "REQUEST_CANCELLED_SUCCESS";

export const REQUEST_APPROVED = "REQUEST_APPROVED";
export const REQUEST_APPROVED_SUCCESS = "REQUEST_APPROVED_SUCCESS";

export const REQUEST_REJECTED = "REQUEST_REJECTED";
export const REQUEST_REJECTED_SUCCESS = "REQUEST_REJECTED_SUCCESS";

export interface TxnState {
  txn: any;
  selected_tab_txn: any;
  selected_tab_name: any;
  incoming_txn: any;
  pending_txn: any;
  approved_txn: any;
  rejected_txn: any;
  expired_txn: any;
  cancelled_txn: any;
  notification: any;
}

interface EmailValidationRequestAction {
    type: typeof EMAIL_VALIDATION_REQUEST;
    payload?: any
}

interface EmailValidationRequestSuccessAction {
    type: typeof EMAIL_VALIDATION_REQUEST_SUCCESS;
    payload?: any
}  

interface NameValidationRequestAction {
    type: typeof NAME_VALIDATION_REQUEST;
    payload?: any
}

interface NameValidationRequestSuccessAction {
    type: typeof NAME_VALIDATION_REQUEST_SUCCESS;
    payload?: any
}  

interface PhoneValidationRequestAction {
    type: typeof TELEPHONE_VALIDATION_REQUEST;
    payload?: any
}

interface PhoneValidationRequestSuccessAction {
    type: typeof TELEPHONE_VALIDATION_REQUEST_SUCCESS;
    payload?: any
}  

interface GenderValidationRequestAction {
    type: typeof GENDER_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface GenderValidationRequestSuccessAction {
    type: typeof GENDER_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface LocationValidationRequestAction {
    type: typeof LOCATION_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface LocationValidationRequestSuccessAction {
    type: typeof LOCATION_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface BirthdateValidationRequestAction {
    type: typeof BIRTHDATE_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface BirthdateValidationRequestSuccessAction {
    type: typeof BIRTHDATE_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface BirthplaceValidationRequestAction {
    type: typeof BIRTHPLACE_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface BirthplaceValidationRequestSuccessAction {
    type: typeof BIRTHPLACE_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface EducationValidationRequestAction {
    type: typeof EDUCATION_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface EducationValidationRequestSuccessAction {
    type: typeof EDUCATION_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface OccupationValidationRequestAction {
    type: typeof OCCUPATION_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface OccupationValidationRequestSuccessAction {
    type: typeof OCCUPATION_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface WechatValidationRequestAction {
    type: typeof WECHAT_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface WechatValidationRequestSuccessAction {
    type: typeof WECHAT_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface InstagramValidationRequestAction {
    type: typeof INSTAGRAM_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface InstagramValidationRequestSuccessAction {
    type: typeof INSTAGRAM_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface FacebookValidationRequestAction {
    type: typeof FACEBOOK_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface FacebookValidationRequestSuccessAction {
    type: typeof FACEBOOK_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface SnapchatValidationRequestAction {
    type: typeof SNAPCHAT_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface SnapchatValidationRequestSuccessAction {
    type: typeof SNAPCHAT_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface TwitterValidationRequestAction {
    type: typeof TWITTER_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface TwitterValidationRequestSuccessAction {
    type: typeof TWITTER_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface TelegramValidationRequestAction {
    type: typeof TELEGRAM_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface TelegramValidationRequestSuccessAction {
    type: typeof TELEGRAM_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface PaypalValidationRequestAction {
    type: typeof PAYPAL_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface PaypalValidationRequestSuccessAction {
    type: typeof PAYPAL_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }
  
  interface ElaValidationRequestAction {
    type: typeof ELA_VALIDATION_REQUEST;
    payload?: any
  }  
  
  interface ElaValidationRequestSuccessAction {
    type: typeof ELA_VALIDATION_REQUEST_SUCCESS;
    payload?: any
  }

interface GetAllRequestsAction {
    type: typeof GET_ALL_REQUESTS;
    payload?: any
}  

interface GetAllRequestsSuccessAction {
    type: typeof GET_ALL_REQUESTS_SUCCESS;
    payload?: any
}  

interface GetIncomingRequestsAction {
    type: typeof GET_INCOMING_REQUESTS;
    payload?: any
}  

interface GetIncomingRequestsSuccessAction {
    type: typeof GET_INCOMING_REQUESTS_SUCCESS;
    payload?: any
} 

interface SetSelectedTabRequestsAction {
    type: typeof SET_SELECTED_TAB_REQUESTS;
    payload?: any
}  

interface ShowNotificationAction {
    type: typeof SHOW_NOTIFICATION;
    payload?: any
}

interface HideNotificationAction {
    type: typeof HIDE_NOTIFICATION;
    payload?: any    
}

interface CredSavedAction {
    type: typeof CRED_SAVED;
    payload?: any
}

interface CredSavedSuccessAction {
    type: typeof CRED_SAVED_SUCCESS;
    payload?: any
}  

interface RequestCancelledAction {
    type: typeof REQUEST_CANCELLED;
    payload?: any
}

interface RequestCancelledSuccessAction {
    type: typeof REQUEST_CANCELLED_SUCCESS;
    payload?: any
}  

interface RequestApprovedAction {
    type: typeof REQUEST_APPROVED;
    payload?: any
}

interface RequestApprovedSuccessAction {
    type: typeof REQUEST_APPROVED_SUCCESS;
    payload?: any
}  

interface RequestRejectedAction {
    type: typeof REQUEST_REJECTED;
    payload?: any
}

interface RequestRejectedSuccessAction {
    type: typeof REQUEST_REJECTED_SUCCESS;
    payload?: any
}  

export type TxnActionTypes =
    | EmailValidationRequestAction
    | EmailValidationRequestSuccessAction
    | NameValidationRequestAction
    | NameValidationRequestSuccessAction
    | PhoneValidationRequestAction
    | PhoneValidationRequestSuccessAction
    | GenderValidationRequestAction
    | GenderValidationRequestSuccessAction
    | LocationValidationRequestAction
    | LocationValidationRequestSuccessAction
    | BirthdateValidationRequestAction
    | BirthdateValidationRequestSuccessAction
    | BirthplaceValidationRequestAction
    | BirthplaceValidationRequestSuccessAction
    | EducationValidationRequestAction
    | EducationValidationRequestSuccessAction
    | OccupationValidationRequestAction
    | OccupationValidationRequestSuccessAction
    | WechatValidationRequestAction
    | WechatValidationRequestSuccessAction
    | InstagramValidationRequestAction
    | InstagramValidationRequestSuccessAction
    | FacebookValidationRequestAction
    | FacebookValidationRequestSuccessAction
    | SnapchatValidationRequestAction
    | SnapchatValidationRequestSuccessAction
    | TwitterValidationRequestAction
    | TwitterValidationRequestSuccessAction
    | TelegramValidationRequestAction
    | TelegramValidationRequestSuccessAction
    | PaypalValidationRequestAction
    | PaypalValidationRequestSuccessAction
    | ElaValidationRequestAction
    | ElaValidationRequestSuccessAction    
    | GetAllRequestsAction
    | GetAllRequestsSuccessAction
    | GetIncomingRequestsAction
    | GetIncomingRequestsSuccessAction
    | SetSelectedTabRequestsAction
    | ShowNotificationAction
    | HideNotificationAction
    | CredSavedAction
    | CredSavedSuccessAction
    | RequestCancelledAction
    | RequestCancelledSuccessAction
    | RequestApprovedAction
    | RequestApprovedSuccessAction
    | RequestRejectedAction
    | RequestRejectedSuccessAction        