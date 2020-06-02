import React from 'react';
import { IonContent, IonHeader, IonPage,IonSegment, IonSegmentButton, IonTitle,IonGrid,IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem,IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import './Requests.css';

const RequestBlocks: React.FC = (requests:any) => {
  return (
        <>
        {requests.txn && requests.txn.length > 0 ? 
        requests.txn.map((txn: any) =>
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
      </>
  );
};

export default RequestBlocks;