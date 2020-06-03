import {
  TxnState,
  TxnActionTypes,
  EMAIL_VALIDATION_REQUEST_SUCCESS,
  GET_ALL_REQUESTS_SUCCESS,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from "./types";

const initialState: TxnState = {
  txn: null,
  newTxnAdded: false
};

export const txnReducer = (
  state = initialState,
  action: TxnActionTypes
): TxnState => {
  const { payload, type } = action;

  switch (type) {
    case EMAIL_VALIDATION_REQUEST_SUCCESS:
      {
      console.log("State in reducer")
      console.log(state)
      //TODO: 
      // console.log("Now attempt to push txn to array")
      // return { ...state, txn: state.txn.push(payload) };
      return { ...state, newTxnAdded: true };
      }
      case GET_ALL_REQUESTS_SUCCESS:
        {
          return { ...state, txn: payload };
        }
      case SHOW_NOTIFICATION:
        {
          return {...state, newTxnAdded: true}
        }
        case HIDE_NOTIFICATION:
          {
            return {...state, newTxnAdded: false}
          }        
      default:
        return state;
  }
};