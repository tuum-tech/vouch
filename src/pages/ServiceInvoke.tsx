import React, { useCallback } from 'react';


import { IonContent ,IonListHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonThumbnail, IonItem, IonToolbar, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import './ServiceInvoke.css';

import { useEmailValidation } from '../hooks/useEmailValidation'
import { emailValidation, showNotification, hideNotification } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'

declare let titleBarManager: TitleBarPlugin.TitleBarManager;

const ServiceInvokePage: React.FC = ({ history }: any) => {

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

  let myIconListener = (menuIcon:any) => {
    if (menuIcon.key === "back") {
        goTo('/home')
    }
  };

  useIonViewWillEnter(() => {    
      titleBarManager.setIcon(1, {
        key: "back",
        iconPath: "back"
      });

      titleBarManager.addOnItemClickedListener(myIconListener);
  });

  useIonViewWillLeave(() => {
    titleBarManager.removeOnItemClickedListener(myIconListener);    
    titleBarManager.setIcon(1, {
      key: '',
      iconPath: ''
    });
  })



  const dispatch = useDispatch()

  const user = useSelector((state:AppState) => state.auth.user)
  const validationProviders = useSelector((state:AppState) => state.validationProviders)

  const [sendEmailValidationRequest] = useEmailValidation((txn:any) => { 
    if(txn.data) {
      dispatch(emailValidation(txn.data, () => goTo('/home')))
      dispatch(showNotification({"message": txn.message, "type": "success"}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)      
    } 
    else {
      history.push('/home');
      dispatch(showNotification({"message": txn.message, "type": "warning"}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000) 
    }
   })

  const handleValidationProviderClick = (e: any) => {
    let providerid = e.currentTarget.getAttribute('data-providerid');
    sendEmailValidationRequest({ user: user, providerId: providerid });
  }

  return (
    <IonPage>
      <IonContent>
      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Email Verification</IonTitle>
        </IonToolbar>
      <IonGrid className="pad-me--top">
        <IonRow>
        <IonCol className="Providers-List">
        <IonListHeader>
                  <IonLabel className="List-Header">Choose a validation provider from the list</IonLabel>
                </IonListHeader>
<br/>

                {validationProviders.emailValidationProviders && validationProviders.emailValidationProviders.map((emailValidationProvider: any) => 
                <IonItem key={emailValidationProvider.id} data-providerid={emailValidationProvider.id} className="" onClick={(e) => handleValidationProviderClick(e)}>
                  <IonThumbnail slot="start">
                    <img src={emailValidationProvider.logo} alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{emailValidationProvider.name}</h2>
                  </IonLabel>
                </IonItem>
                )}               
        </IonCol>
        </IonRow>

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ServiceInvokePage;
