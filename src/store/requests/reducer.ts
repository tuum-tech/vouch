import {
  TxnState,
  TxnActionTypes,
  EMAIL_VALIDATION_REQUEST_SUCCESS,
  GET_ALL_REQUESTS_SUCCESS
} from "./types";

const initialState: TxnState = {
  txn: null,
  pending_txn: null,
  approved_txn: null,
  rejected_txn: null,
  expired_txn: null
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
      console.log("Now attempt to push txn to array")

      let all_txn = state.txn || []
      let pending_txn = state.pending_txn || []

      return { ...state, txn: all_txn.push(payload), pending_txn: pending_txn.push(payload) };
      // return { ...state };
      }
      case GET_ALL_REQUESTS_SUCCESS:
        {

          console.log("Debug me");          
          console.log(payload);
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
      default:
        return state;
  }
};