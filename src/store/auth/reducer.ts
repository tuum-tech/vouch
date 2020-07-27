import {
  AuthState,
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";

const initialState: AuthState = {
  user: null,
};

const getBase64Image = (obj:any) => {
  return `data:${obj["content-type"]};${obj["type"]},${obj["data"]}`
}

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUCCESS: {
      if (payload.avatar)
      {
        payload.avatar = getBase64Image(payload.avatar)
      }        
      return { ...state, user: payload };
    }
    case LOGOUT_SUCCESS:
      return { ...state, user: null };
    default:
      return state;
  }
};