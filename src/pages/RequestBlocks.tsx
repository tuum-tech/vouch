import React from 'react';
import { IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem } from '@ionic/react';
import './Requests.css';

const RequestBlocks = (props: any) => {
  const requests_txn = props.requests
  return (
        <>
        {requests_txn && requests_txn.length > 0 ? 
        requests_txn.map((txn: any) =>
          <IonRow>
          <IonCol className="Providers-List">
          <IonItem routerLink={`/requests/details/${txn.id}`} key={txn.id}>
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