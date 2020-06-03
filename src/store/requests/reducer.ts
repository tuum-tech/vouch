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
  pending_txn: null,
  approved_txn: null,
  rejected_txn: null,
  expired_txn: null
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
        return { ...state, 
          txn: [...state.txn, payload], 
          pending_txn: [...state.pending_txn, payload],
          newTxnAdded: true
        };
      }
    case GET_ALL_REQUESTS_SUCCESS:
      {
        let pending_txn = payload.filter((txn:any) => txn.status === "Pending");
        let approved_txn = payload.filter((txn:any) => txn.status === "Success");
        let rejected_txn = payload.filter((txn:any) => txn.status === "Rejected");
        let expired_txn = payload.filter((txn:any) => txn.status === "Expired");

        return { 
          ...state, 
          txn: payload, 
          pending_txn: pending_txn, 
          approved_txn: approved_txn,
          rejected_txn: rejected_txn,
          expired_txn: expired_txn
        };
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