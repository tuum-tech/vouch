import React from 'react';
import { IonRow,IonCol,IonLabel, IonThumbnail,IonButton, IonItem } from '@ionic/react';
import './RequestBlocks.css';
import moment from 'moment'

const RequestBlocks = (props: any) => {

  const relativeTime = function(datetime:any) {
    if (!datetime) return "";

    return moment.utc(datetime).fromNow()
  }    

  const requests_txn = props.requests
  return (
        <>
        {requests_txn && requests_txn.length > 0 ? 
        requests_txn.map((txn: any) =>
          <IonRow key={txn.id}>
          <IonCol className="RequestBlock">
          <IonItem routerLink={`/requests/details/${txn.id}`}>
                    <IonThumbnail slot="start">
                      <img src="../assets/images/components/icon-email--request.svg" alt="" />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>Email Validation</h2>
                      <p>{relativeTime(txn.created)}</p>
                    </IonLabel>
                    <IonButton shape="round" className="status" style={{margin: 0}} color={`${txn.status === "Approved" ? "success" : ""}${txn.status === "Pending" ? "light" : ""}${txn.status === "Rejected" ? "danger" : ""}${txn.status === "Expired" ? "medium" : ""}`} 
                    slot="end">{txn.status}</IonButton>
                  </IonItem>
          </IonCol>
          </IonRow>
        ) : 
        
        <IonRow>
        <IonCol className="RequestBlock">
          <p>No request made so far.</p>
        </IonCol>
      </IonRow>
      }
      </>
  );
};

export default RequestBlocks;