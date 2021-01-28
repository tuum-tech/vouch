import { createSelector } from 'reselect'

const getVisibilityFilter = (state:any) => state.visibilityFilter
const getRequests = (state:any) => state.txn

export const getVisibleRequests = createSelector(
  [ getVisibilityFilter, getRequests ],
  (visibilityFilter:any, requests:any) => {
    switch (visibilityFilter) {
        case 'SHOW_ALL':
            return requests
        case 'SHOW_PENDING':
            return requests.filter((txn:any) => Object.assign({}, txn, (
                txn.status === "New" || 
                txn.status === "In progress" || 
                txn.status === "Cancelation in progress")).sort((a:any, b:any) => {
                    let c:any = new Date(a.created);
                    let d:any = new Date(b.created);
                    return c < d ? 1 : -1;
                }));
        case 'SHOW_APPROVED':
            return requests.filter((txn:any) => Object.assign({}, txn, (
                txn.status === "Approved")).sort((a:any, b:any) => {
                    let c:any = new Date(a.created);
                    let d:any = new Date(b.created);
                    return c < d ? 1 : -1;
                }));
        case 'SHOW_REJECTED':
            return requests.filter((txn:any) => Object.assign({}, txn, (
                txn.status === "Rejected")).sort((a:any, b:any) => {
                    let c:any = new Date(a.created);
                    let d:any = new Date(b.created);
                    return c < d ? 1 : -1;
                }));
        case 'SHOW_EXPIRED':
            return requests.filter((txn:any) => Object.assign({}, txn, (
                txn.status === "Expired")).sort((a:any, b:any) => {
                    let c:any = new Date(a.created);
                    let d:any = new Date(b.created);
                    return c < d ? 1 : -1;
                }));
    }
  }
)