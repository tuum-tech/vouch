import {
  TxnState,
  TxnActionTypes,
  EMAIL_VALIDATION_REQUEST_SUCCESS,
  GET_ALL_REQUESTS_SUCCESS,
  GET_INCOMING_REQUESTS_SUCCESS,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_SELECTED_TAB_REQUESTS,
  CRED_SAVED_SUCCESS,
  REQUEST_CANCELLED_SUCCESS
} from "./types";

const initialState: TxnState = {
  txn: null,
  selected_tab_txn: null,
  selected_tab_name: null,
  incoming_txn: null,
  pending_txn: null,
  approved_txn: null,
  rejected_txn: null,
  expired_txn: null,
  cancelled_txn: null,
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
          pending_txn: [...state.pending_txn, payload]
        };
      }
      case SET_SELECTED_TAB_REQUESTS:
        {
          return { ...state, 
            selected_tab_txn: payload.data,
            selected_tab_name: payload.name
          };
        }            
    case GET_ALL_REQUESTS_SUCCESS:
      {
        let pending_txn = payload.filter((txn:any) => (txn.status === "New" || txn.status === "In progress" || txn.status === "Cancelation in progress"));
        let approved_txn = payload.filter((txn:any) => txn.status === "Approved");
        let rejected_txn = payload.filter((txn:any) => txn.status === "Rejected");
        let expired_txn = payload.filter((txn:any) => txn.status === "Expired");
        // let cancelled_txn = payload.filter((txn:any) => txn.status === "Canceled");

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

        // cancelled_txn = cancelled_txn.sort((a:any, b:any) => {
        //   let c:any = new Date(a.date).getTime();
        //   let d:any = new Date(b.date).getTime();
        //   return c > d ? 1 : -1;
        // });        

        return { 
          ...state, 
          txn: all_txn,
          selected_tab_txn: all_txn, 
          selected_tab_name: 'all',
          // incoming_txn: null, 
          pending_txn: pending_txn, 
          approved_txn: approved_txn,
          rejected_txn: rejected_txn,
          expired_txn: expired_txn,
          // cancelled_txn: cancelled_txn,
        };
      }
      case GET_INCOMING_REQUESTS_SUCCESS:
        {
          let incoming_txn = payload.filter((txn:any) => (txn.status === "New" || txn.status === "In progress" || txn.status === "Cancelation in progress"));
  
          incoming_txn = incoming_txn.sort((a:any, b:any) => {
            let c:any = new Date(a.date).getTime();
            let d:any = new Date(b.date).getTime();
            return c > d ? 1 : -1;
          });
    
          console.log("Incoming txn computed in reducer")
          console.log(incoming_txn)
  
          return { 
            ...state, 
            incoming_txn: incoming_txn, 
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
      case REQUEST_CANCELLED_SUCCESS:
        {  
          return { ...state, 
            txn: state.txn.map(
              (t:any) => t.id === payload.data.id ? payload.data : t
            ),
            pending_txn: state.pending_txn.filter(
              (t:any) => t.id !== payload.data.id
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