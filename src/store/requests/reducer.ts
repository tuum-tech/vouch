import {
  TxnState,
  TxnActionTypes,
  EMAIL_VALIDATION_REQUEST_SUCCESS,
  GET_ALL_REQUESTS_SUCCESS,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_SELECTED_TAB_REQUESTS,
  CRED_SAVED_SUCCESS
} from "./types";

const initialState: TxnState = {
  txn: null,
  selected_tab_txn: null,
  pending_txn: null,
  approved_txn: null,
  rejected_txn: null,
  expired_txn: null,
  notification: {
    show: false,
    message: '',
    type: ''
  }
};

export const txnReducer = (
  state = initialState,
  action: TxnActionTypes
): TxnState => {
  const { payload, type } = action;

  switch (type) {
    case EMAIL_VALIDATION_REQUEST_SUCCESS:
      {
        state.txn = null ?? []
        state.pending_txn = null ?? []

        return { ...state, 
          txn: [...state.txn, payload], 
          pending_txn: [...state.pending_txn, payload],
          notification: {
            show: true
          }
        };
      }
      case SET_SELECTED_TAB_REQUESTS:
        {
          return { ...state, 
            selected_tab_txn: payload
          };
        }            
    case GET_ALL_REQUESTS_SUCCESS:
      {
        let pending_txn = payload.filter((txn:any) => txn.status === "Pending");
        let approved_txn = payload.filter((txn:any) => txn.status === "Approved");
        let rejected_txn = payload.filter((txn:any) => txn.status === "Rejected");
        let expired_txn = payload.filter((txn:any) => txn.status === "Expired");

        let all_txn = payload.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });


        pending_txn = pending_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });


        approved_txn = approved_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });


        rejected_txn = rejected_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });
        
        expired_txn = expired_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });        

        return { 
          ...state, 
          txn: all_txn,
          selected_tab_txn: all_txn, 
          pending_txn: pending_txn, 
          approved_txn: approved_txn,
          rejected_txn: rejected_txn,
          expired_txn: expired_txn
        };
      }
    case SHOW_NOTIFICATION:
      {
        return {...state,           
          notification: {
            show: true,
            message: payload.message,
            type: payload.type
          }}
      }
    case HIDE_NOTIFICATION:
      {
        return {...state, 
          notification: {
            show: false,
            message: '', 
            type: ''
          }        
        
        }
      }
      case CRED_SAVED_SUCCESS:
        {
          return { ...state, 
            txn: state.txn.map(
              (t:any) => t.id === payload.data.id ? payload.data : t
            ),
            notification: {
              show: true,
              message: payload.message,
              type: 'success'
            }
          };
        }              
    default:
      return state;
  }
};