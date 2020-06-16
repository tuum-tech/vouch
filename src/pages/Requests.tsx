import React from 'react';
import { IonContent, IonHeader, IonPage,IonSegment, IonSegmentButton, IonTitle,IonGrid,IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem,IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/react';
import './Requests.css';
import { arrowBack } from 'ionicons/icons';

import { useSelector } from 'react-redux';
import { AppState } from '../store'
// import RequestBlocks from './RequestBlocks';


const RequestsPage: React.FC = () => {

  const requests = useSelector((state:AppState) => state.requests)
  let tab_txn = requests.txn

  const handleClick = function(tab_event: any) {
    console.log(tab_event);
    alert(tab_event);
    let clicked_tab = tab_event;
    if(clicked_tab === 'all'){
      tab_txn = requests.txn;      
    }
    if(clicked_tab === 'active'){
      tab_txn = requests.pending_txn;      
    }
    if(clicked_tab === 'approved'){
      tab_txn = requests.approved_txn;      
    }
    if(clicked_tab === 'rejected'){
      tab_txn = requests.rejected_txn;      
    }
    if(clicked_tab === 'expired'){
      tab_txn = requests.expired_txn;      
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
          {/* <IonSegment scrollable onIonChange={e => console.log('Segment selected', e.detail.value)}> */}
          <IonSegment scrollable onIonChange={(e:any) => handleClick(e.detail.value)}>
          <IonSegmentButton value="all" checked>
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

        {/* <RequestBlocks requests={tab_txn || {}} /> */}

        {tab_txn && tab_txn.length > 0 ? 
        tab_txn.map((txn: any) =>
          <IonRow>
          <IonCol className="Providers-List">
          <IonItem routerLink={`/requests/details/${txn._id}`} key={txn._id}>
                    <IonThumbnail slot="start">
                      <img src="/assets/images/ui components/icon-Email--request.svg" alt="" />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>Email Validation</h2>
                      <p>{txn.createdIn}</p>
                    </IonLabel>
                    <IonButton fill="outline" slot="end">{txn.status}</IonButton>
                  </IonItem>
          </IonCol>
          </IonRow>
        ) : 
        
        <IonRow>
        <IonCol className="Providers-List">
          <p>No requests made so far.</p>
        </IonCol>
      </IonRow>
        
        }
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RequestsPage;