import React from 'react';
import { IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonTitle,IonGrid,IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem,IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/react';
import './Requests.css';
import { arrowBack } from 'ionicons/icons';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store'
import RequestBlocks from './RequestBlocks';
import { setSelectedTabRequests } from '../store/requests';

const RequestsPage: React.FC = () => {

  const dispatch = useDispatch()  
  const requests = useSelector((state:AppState) => state.requests)

  const handleClick = function(tab_event: any) {
    // console.log(tab_event);
    // alert(tab_event);
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
      <IonHeader className="main-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" />
          </IonButtons>
          <IonImg className="Navbar-Logo" src="/assets/images/ui components/empty.png"></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Request</IonTitle>
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