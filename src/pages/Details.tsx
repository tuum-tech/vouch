import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonChip,IonButtons,IonListHeader,IonBackButton,IonGrid,IonRow,IonCol,IonLabel,IonToolbar, IonList, IonTextarea } from '@ionic/react';
import './Details.css';
import { arrowBack } from 'ionicons/icons';

import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { useParams } from 'react-router-dom';

const RequestsPage: React.FC = () => {

  const requests = useSelector((state:AppState) => state.requests)
  const { id } = useParams()

  console.log("Request ID: " + id);
  const requestDetails = requests.txn.filter((txn: any) => txn._id === id)[0]
  console.log(requestDetails)

  const copyText = function (elementId: any){
    let copyText:any = document.querySelector("#" + elementId);
    let inputField = copyText.getElementsByTagName("textarea")[0];
    inputField.select();
    document.execCommand("copy");    
  }

  return (
    <IonPage class="Details">
      <IonHeader className="main-header">
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon={arrowBack} text="" />
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Request Details</IonTitle>
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

        <IonRow>
          <IonList>	              
            <IonCol size="11" className="userdid">
                <IonTextarea rows={2} cols={20} id="userDID" readonly value={user && user.id}>
                </IonTextarea>
            </IonCol>
            <IonIcon name="copy-outline" src="/assets/images/icons/copy-outline.svg" onClick={(e:any) => copyText("userDID")} />
            </IonCol>              
            </IonRow>

        {/* <IonRow>
          <IonCol>
            <IonLabel className="List-Header"><strong>Verified Credentials: </strong><br />
            {requestDetails.verifiedCredential}</IonLabel>
          </IonCol>
        </IonRow> */}

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RequestsPage;