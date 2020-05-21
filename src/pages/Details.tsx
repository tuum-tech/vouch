import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonChip,IonButtons,IonListHeader,IonBackButton,IonGrid,IonRow,IonCol,IonLabel,IonToolbar, IonImg } from '@ionic/react';
import './Details.css';
import { arrowBack } from 'ionicons/icons';

import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { useParams } from 'react-router-dom';

const RequestsPage: React.FC = () => {

  const requests = useSelector((state:AppState) => state.txn)
  const { id } = useParams()

  console.log("Request ID: " + id);
  const requestDetails = requests.txn.filter((txn: any) => txn._id === id)[0]
  console.log(requestDetails)

  return (
    <IonPage>
      <IonHeader className="main-header">
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon="arrowBack" text="Back" />
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Email Validation Request</IonTitle>
        </IonToolbar>
      <IonGrid className="pad-me--top thick-padding">
        <IonRow>        
          <IonCol size="8">
            <IonListHeader>
              <IonLabel className="List-Header"><strong>Request ID: {requestDetails._id}</strong></IonLabel>
            </IonListHeader>
            {requestDetails.createdIn}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel className="List-Header"><strong>Email: </strong>{requestDetails.params.email}</IonLabel>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel className="List-Header"><strong>Status: </strong>
            
            <IonChip>
              {requestDetails.status}
            </IonChip>
            
            </IonLabel>

          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonLabel className="List-Header"><strong>Last Updated: </strong>{requestDetails.lastUpdate}</IonLabel>
          </IonCol>
        </IonRow>

        {/* <IonRow>
          <IonCol>
            <IonLabel className="List-Header"><strong>Verified Credentials: </strong><br />
            {requestDetails.verifiedCredential}</IonLabel>
          </IonCol>
        </IonRow> */}

        {/* <IonRow>
          <IonCol>
            <IonLabel>Request expires on: <br/>20 Dec 2021</IonLabel>
          </IonCol>
        </IonRow> */}
      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RequestsPage;