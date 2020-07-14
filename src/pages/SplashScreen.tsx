import React, { useCallback, useEffect } from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonImg } from '@ionic/react';
import './SplashScreen.css';
import { useDispatch } from 'react-redux';
import { authCheckStatus } from '../store/auth'

const SplashScreenPage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()

  const goTo = useCallback(
    (path: string) => {
      if(history){
        history.push(path, { direction: 'forward' });
      }
    },
    [history],
  );
  
  const onDeviceReady = useCallback(
    () => {
      setTimeout(() => {
        dispatch(authCheckStatus(() => goTo('/home'), () => goTo('/onboarding')))
      }, 3000)      
    },
    [dispatch, goTo],
  );  

  useEffect(() => {
    document.addEventListener('deviceready', onDeviceReady, false);

    return () => {
      document.removeEventListener('deviceready', onDeviceReady);
    };
  }, [onDeviceReady]);

  return (
    <IonPage className="SplashScreen">
      <IonContent className="background" fullscreen>
        <IonGrid>
          <IonRow className="ion-text-center">
            <IonCol className="ion-align-items-center">
              <div>
                <IonImg className="animated zoomIn delay-2s logo text-center spacer" src="../assets/images/UI Components/logo_vertical--white.svg" />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreenPage;
