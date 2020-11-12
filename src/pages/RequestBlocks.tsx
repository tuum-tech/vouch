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
  const tabName = props.tabName
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
                      <h2>{txn.validationType.charAt(0).toUpperCase()}{txn.validationType.slice(1)} Validation</h2>
                      { tabName === "incoming" &&
                        <p>{txn.requestParams[txn.validationType]}</p>
                      }
                      <p>{relativeTime(txn.created)}</p>
                    </IonLabel>
                    <IonButton shape="round" className="status" style={{margin: 0}} color={`${txn.status === "Approved" ? "success" : ""}${(txn.status === "New" || txn.status === 'Cancelation in progress') ? "light" : ""}${txn.status === "In progress" ? "primary" : ""}${txn.status === "Rejected" ? "danger" : ""}${txn.status === "Expired" ? "medium" : ""}${txn.status === "Canceled" ? "warning" : ""}`} 
                    slot="end">
                      {`
                        ${txn.status === "Approved" ? "Approved" : ""} 
                        ${txn.status === "New" ? "New" : ""}
                        ${txn.status === "In progress" ? "In Progress" : ""}
                        ${txn.status === "Rejected" ? "Rejected" : ""}
                        ${txn.status === "Expired" ? "Expired" : ""}
                        ${txn.status === "Canceled" ? "Cancelled" : ""}
                        ${txn.status === "Cancelation in progress" ? "Cancelling" : ""}
                      `}                      
                      </IonButton>
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