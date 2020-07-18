import React from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonTitle,IonGrid,IonRow,IonCol,IonLabel, IonToolbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Requests.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store'
import RequestBlocks from './RequestBlocks';
import { setSelectedTabRequests } from '../store/requests';
import { RefresherEventDetail } from '@ionic/core';

import { useRequests } from '../hooks/useRequests'
import { getAllRequests } from '../store/requests'

const RequestsPage: React.FC = () => {

  const dispatch = useDispatch()  
  const requests = useSelector((state:AppState) => state.requests)
  const user = useSelector((state:AppState) => state.auth.user)  

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    sendGetAllRequestsReq(user)

    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const [sendGetAllRequestsReq] = useRequests((txn:any) => { 
    if(txn) {
      dispatch(getAllRequests(txn))
    }
   })   

  const handleClick = function(e: any) {
    let tab_event = e.detail.value;
    if(tab_event === 'all'){
      dispatch(setSelectedTabRequests({'name':'all','data':requests.txn}))
    }
    if(tab_event === 'active'){
      dispatch(setSelectedTabRequests({'name':'pending','data':requests.pending_txn}))      
    }
    if(tab_event === 'approved'){
      dispatch(setSelectedTabRequests({'name':'approved','data':requests.approved_txn}))            
    }
    if(tab_event === 'rejected'){
      dispatch(setSelectedTabRequests({'name':'rejected','data':requests.rejected_txn}))            
    }
    if(tab_event === 'expired'){
      dispatch(setSelectedTabRequests({'name':'expired','data':requests.expired_txn}))            
    }
  }  

  return (
    <IonPage>
      <IonContent>

        <IonRefresher className="refresher" slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={80} pullMax={200}>
            <IonRefresherContent
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing Requests Status...">
            </IonRefresherContent>
        </IonRefresher>

      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Requests</IonTitle>
        </IonToolbar>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSegment className="custom-segment" scrollable onIonChange={(e:any) => handleClick(e)}>
          <IonSegmentButton value="all" className={requests.selected_tab_name === 'all' ? 'active-tab' : ''}>
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="active" disabled={requests.pending_txn == null || requests.pending_txn.length === 0}>
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="approved" disabled={requests.approved_txn == null || requests.approved_txn.length === 0}>
            <IonLabel>Approved</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="rejected" disabled={requests.rejected_txn == null || requests.rejected_txn.length === 0}>
            <IonLabel>Rejected</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="expired" disabled={requests.expired_txn == null || requests.expired_txn.length === 0}>
            <IonLabel>Expired</IonLabel>
          </IonSegmentButton>
        </IonSegment>
          </IonCol>
        </IonRow>

        <RequestBlocks requests={requests.selected_tab_txn || {}} />

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(RequestsPage);