import React, { useCallback, useEffect } from 'react';
import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonImg } from '@ionic/react';
import './SplashScreen.css';
import { useDispatch } from 'react-redux';
import { authCheckStatus, login } from '../store/auth'
import { Plugins } from '@capacitor/core';

const SplashScreenPage: React.FC = ({ history }: any) => {

  console.log("I am at splash screen")
  const { Storage } = Plugins;
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
    async () => {
      const hasOnboarded = await Storage.get({ key: 'onboarded' })
      const hasUserdata = await Storage.get({key: 'user' })
      const intentData = await Storage.get({ key: 'intentData' })

      setTimeout(async () => {
          if(intentData.value){
            // const user = Object.assign({}, ...credSubjects)
            const parsedIntentData = JSON.parse(intentData.value)
            const user = parsedIntentData.params.claims
            dispatch(login(user, () => goTo('/home/intent-service-invoke')))
            // goTo('/home/intent-service-invoke')
          } else if(!hasOnboarded.value || !hasUserdata.value){
            await Storage.set({ key: 'onboarded', value: 'true'})        
            goTo('/onboarding')  
          } else {
            dispatch(authCheckStatus(() => goTo('/home')))
          }
        }, 3000)      
    },
    [Storage, dispatch, goTo],
  );


  // const onDeviceReady = useCallback(
  //   () => {
  //     setTimeout(() => {
  //       dispatch(authCheckStatus(() => goTo('/home'), () => goTo('/onboarding')))
  //     }, 3000)      
  //   },
  //   [dispatch, goTo],
  // );  

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
                <IonImg className="animated zoomIn delay-2s logo text-center spacer" src="../assets/images/components/logo_vertical--white.svg" />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreenPage;
