import React from 'react';
import { IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem } from '@ionic/react';
import './Requests.css';
import moment from 'moment'

const RequestBlocks = (props: any) => {

  const relativeTime = function(request:any) {
    if (!request) return "";
    
    if (request.modified){
       return moment(request.modified).fromNow()
    }
    return moment(request.created).fromNow()
  }    

  const requests_txn = props.requests
  return (
        <>
        {requests_txn && requests_txn.length > 0 ? 
        requests_txn.map((txn: any) =>
          <IonRow key={txn.id}>
          <IonCol className="Providers-List">
          <IonItem routerLink={`/requests/details/${txn.id}`}>
                    <IonThumbnail slot="start">
                      <img src="/assets/images/ui components/icon-Email--request.svg" alt="" />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>Email Validation</h2>
                      <p>{relativeTime(txn)}</p>
                    </IonLabel>
                    <IonButton shape="round" color={`${txn.status === "Approved" ? "success" : ""}${txn.status === "Pending" ? "light" : ""}${txn.status === "Rejected" ? "danger" : ""}${txn.status === "Expired" ? "medium" : ""}`} 
                    slot="end">{txn.status}</IonButton>
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