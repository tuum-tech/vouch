import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'

import { IonPage, IonImg, IonGrid, IonRow, IonCol, IonContent, IonButton } from '@ionic/react';
import './SignIn.css';

import { useDID } from '../hooks/useDID'
import { login, authCheckStatus } from '../store/auth'

declare global{
  interface Window {
      cordova : any
  }
}

const SignInPage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const user = credentials[0].credentialSubject
      dispatch(login(user, () => goTo('/home')))
    }
   })
  
  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );
  
  const onDeviceReady = useCallback(
    () => {
      dispatch(authCheckStatus(() => goTo('/home')));
    },
    [dispatch, goTo],
  );

  useEffect(() => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    document.addEventListener('deviceready', onDeviceReady, false);

    return () => {
      document.removeEventListener('deviceready', onDeviceReady);
    };
  }, [onDeviceReady]);

  return (
    <IonPage className="SignIn">
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
            <div className="custom-margin-01">

            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol className="ion-align-items-center">
            <div>
              <h4>Welcome to Vouch App</h4>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol className="ion-align-items-center">
            <div>
              <IonButton className="button cta" onClick={() => { signIn({ name: false, email: false, telephone: false })}}>
                <IonImg src="/assets/images/ui components/did-icon.svg" className="did-icon"></IonImg>
                 Sign in with DID</IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default SignInPage;
