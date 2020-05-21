import React from 'react';
import { IonPage, IonButton, IonGrid, IonRow, IonCol, IonContent, IonImg } from '@ionic/react';
import './SplashScreen.css';

const SplashScreenPage: React.FC = () => {
  return (
    <IonPage className="SplashScreen">
      <IonContent className="background" fullscreen>
        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol className="ion-align-items-center">
              <div>
                <IonImg className="animated zoomIn delay-2s logo text-center spacer" src="/assets/images/ui components/logo_vertical--white.svg" />
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol className="ion-align-items-center">
              <div>
                <IonButton className="animated zoomIn delay-5s button cta" routerLink='/onboarding'></IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreenPage;
