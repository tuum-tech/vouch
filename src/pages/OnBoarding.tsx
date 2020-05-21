import React from 'react';
import { IonPage, IonImg, IonGrid, IonRow, IonCol, IonContent, IonButton } from '@ionic/react';
import './OnBoarding.css';

const OnBoardingPage: React.FC = () => {
  return (
    <IonPage className="OnBoarding">
      <IonContent className="background" fullscreen>

      <IonGrid>
        <IonRow>
          <IonCol>
            <div className="spacer"></div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div className="">
              <IonImg className="logo2 ion-text-center text-center" src="/assets/images/UI Components/logo-horizontal--black.svg" />
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div className="custom-margin-04 custom"></div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div  className="ion-text-center">
              <IonImg className="graphics-01 text-center" src="/assets/images/UI Components/graphics-01.svg" />
            </div>
          </IonCol>
        </IonRow>  
        <IonRow>
          <IonCol>
            <div className="custom-margin-02"></div>
          </IonCol>
        </IonRow>      
        <IonRow className="ion-text-center">
          <IonCol className="ion-align-items-center">
            <div>
              <h4>DID Validation Services</h4>
              <h5>Email, Name, Location, Phone</h5>
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div className="custom-margin-03"></div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol className="ion-align-items-center">
            <div>
              <IonButton className="button cta" routerLink='/signin'>Take me to App</IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default OnBoardingPage;
