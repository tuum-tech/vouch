import React from 'react';
import { IonContent, IonHeader,IonListHeader, IonPage, IonTitle,IonImg,IonGrid,IonButtons,IonBackButton,IonRow,IonCol,IonLabel, IonButton, IonToolbar } from '@ionic/react';
import './Pleasewait.css';
const PleaseWaitPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="main-header">
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Email Verification</IonTitle>
        </IonToolbar>
      <IonGrid className="pad-me--top">
        <IonRow>
        <IonCol className="Providers-List">
        <IonImg className="loader text-center" src="../assets/images/components/loading.gif"></IonImg>
        <IonListHeader>
          
                  <IonLabel className="List-Header">Please Wait… <br></br>
Processing Your Request</IonLabel>
                </IonListHeader>
<br/>
  <IonButton routerLink='/home' ></IonButton>
        </IonCol>
        </IonRow>

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PleaseWaitPage;