import React, { useCallback } from 'react';
import { IonPage, IonImg, IonGrid, IonRow, IonCol, IonContent, IonButton } from '@ionic/react';
import './OnBoarding.css';
import { useDispatch } from 'react-redux';
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';

const OnBoardingPage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
      const user = Object.assign({}, ...credSubjects)
      dispatch(login(user, () => goTo('/home')))
    }
   })
  
  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

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
              <IonImg className="logo2 ion-text-center text-center" src="../assets/images/UI Components/logo-horizontal--black.svg" />
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
              <IonImg className="graphics-01 text-center" src="../assets/images/UI Components/graphics-01.svg" />
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
              <h5>Email, Name, Phone</h5>
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
              <IonButton className="button cta" onClick={() => { signIn({ name: false, email: false, telephone: false })}}>Take me to App</IonButton>            
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default OnBoardingPage;