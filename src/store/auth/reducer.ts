import {
  AuthState,
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";

const initialState: AuthState = {
  user: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, user: payload };
    case LOGOUT_SUCCESS:
      return { ...state, user: null };
    default:
      return state;
  }
};