

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from "./auth";
import { txnReducer } from "./requests";

const rootReducer = combineReducers({
  auth: authReducer,
  requests: txnReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppState = ReturnType<typeof rootReducer>;

// https://github.com/GradooC/chat/tree/33bb2d5a1d2c98875b9a2eb847bb5506bb8a0732/src/store