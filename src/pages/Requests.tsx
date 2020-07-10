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

  const handleClick = function(tab_event: any) {
    let clicked_tab = tab_event;
    if(clicked_tab === 'all'){
      dispatch(setSelectedTabRequests(requests.txn))
    }
    if(clicked_tab === 'active'){
      dispatch(setSelectedTabRequests(requests.pending_txn))      
    }
    if(clicked_tab === 'approved'){
      dispatch(setSelectedTabRequests(requests.approved_txn))            
    }
    if(clicked_tab === 'rejected'){
      dispatch(setSelectedTabRequests(requests.rejected_txn))            
    }
    if(clicked_tab === 'expired'){
      dispatch(setSelectedTabRequests(requests.expired_txn))            
    }            
  }  

  return (
    <IonPage>
      <IonContent>

        <IonRefresher className="refresher" slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
            <IonRefresherContent
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing Requests Status...">
            </IonRefresherContent>
        </IonRefresher>

      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Requests</IonTitle>
        </IonToolbar>
      <IonGrid className="pad-me--top thick-padding">
        <IonRow>
          <IonCol>
          {/* <IonSegment scrollable onIonChange={e => console.log('Segment selected', e.detail.value)} value="all"> */}
          <IonSegment scrollable onIonChange={(e:any) => handleClick(e.detail.value)}>
          <IonSegmentButton value="all">
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

export default RequestsPage;