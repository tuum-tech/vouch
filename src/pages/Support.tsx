import React from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonListHeader, IonLabel, IonToolbar, IonImg, IonPage, IonTitle, IonContent, IonTextarea, IonIcon } from '@ionic/react';
import './Profile.css';
import './Support.css';

const SupportPage: React.FC = () => {

  return (
    <IonPage className="Profile Support">
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Support</IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">
          <IonRow>
            <IonCol size="12">
              <h2 style={{margin: 0}}>Tutorial</h2>
              <ol>
                <li>Select from the list of available services such as "Email Validation", "Phone Validation", etc</li>
                <li>Choose your preferred validator</li>
                <li>Wait to be verified</li>
                <li>You can swipe down on the Home page to refresh data</li>
                <li>Check out "Approved" tab from Requests page to see all your past requests</li>
              </ol>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(SupportPage);
