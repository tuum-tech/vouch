import React, { useState, useCallback } from 'react';
import { IonPage, IonImg, IonGrid, IonRow, IonCol, IonContent, IonButton, IonAlert } from '@ionic/react';
import './OnBoarding.css';
import { useDispatch } from 'react-redux';
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';

const OnBoardingPage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()
  const [showTutorial, setShowTutorial] = useState(false);

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
              <IonImg className="logo2 ion-text-center text-center" src="../assets/images/components/logo-horizontal--black.svg" />
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
              <IonImg className="graphics-01 text-center" src="../assets/images/components/graphics-01.svg" />
            </div>
          </IonCol>
        </IonRow>  
        <IonRow className="ion-text-center">
          <IonCol className="ion-align-items-center">
            <div>
              <h4 style={{marginTop: 0}}>DID Validation Services</h4>
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
              <IonButton className="button cta" onClick={() => { signIn({ name: false, email: false, avatar: false })}}>
                <IonImg src="../assets/images/components/did-icon.svg" className="did-icon"></IonImg>
                 Sign in with DID</IonButton>            
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <div className="tutorial-link">
              <button onClick={() => setShowTutorial(true)}>How to use vouch?</button>
            </div>
          </IonCol>
        </IonRow>        
      </IonGrid>

      </IonContent>

      <IonAlert
          isOpen={showTutorial}
          onDidDismiss={() => setShowTutorial(false)}
          cssClass='Support service-popup-alert no-image'
          header={'Tutorial'}
          message={'<ol><li>Select from the list of available services such as "Email Validation", "Phone Validation", etc</li><li>Choose your preferred validator</li><li>Wait to be verified</li><li>You can swipe down on the Home page to refresh data</li><li>Check out "Approved" tab from Requests page to see all your past requests</li></ol>'}
          buttons={['OK']}
        />

    </IonPage>
  );
};

export default OnBoardingPage;