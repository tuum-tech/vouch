export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface AuthState {
  user: any;
}

interface LoginAction {
  type: typeof LOGIN;
  payload?: any
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload?: any
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload?: any
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
  payload?: any
}

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction