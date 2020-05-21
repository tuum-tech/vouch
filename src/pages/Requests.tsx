import React from 'react';
import { IonContent, IonHeader, IonPage,IonSegment, IonSegmentButton, IonTitle,IonImg,IonGrid,IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem,IonToolbar } from '@ionic/react';
import './Requests.css';

import { useSelector } from 'react-redux';
import { AppState } from '../store'


const RequestsPage: React.FC = () => {

  const requests = useSelector((state:AppState) => state.txn)

  return (
    <IonPage>
      <IonHeader className="main-header">
        <IonToolbar>
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
          <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="active">
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="rejected">
            <IonLabel>Rejected</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="expired">
            <IonLabel>Expired</IonLabel>
          </IonSegmentButton>
        </IonSegment>

          </IonCol>
        </IonRow>

        {requests.txn && requests.txn.map((txn: any) =>
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
        )}
        {/* <IonRow>
        <IonCol className="Providers-List">
        <IonItem routerLink={'/requests/details'}>
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/icon-name--request.svg" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Name Validation</h2>
                    <p>5 Days Ago</p>
                  </IonLabel>
                  <IonButton fill="outline" slot="end" color="light">Pending</IonButton>
                </IonItem>
        </IonCol>
        </IonRow> */}
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RequestsPage;