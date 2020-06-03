import React, { useEffect, useCallback } from 'react';


import { IonContent, IonHeader,IonListHeader, IonPage, IonTitle, IonGrid, IonButtons, IonBackButton, IonRow, IonCol, IonLabel, IonThumbnail, IonItem, IonToolbar } from '@ionic/react';
import './ServiceInvoke.css';

import { useEmailValidation } from '../hooks/useEmailValidation'
import { emailValidation, showNotification, hideNotification } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'


const ServiceInvokePage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()

  const user = useSelector((state:AppState) => state.auth.user)
  
  const [sendEmailValidationRequest] = useEmailValidation((txn:any) => { 
    // console.log("requests");
    // console.log(requests);
    if(txn._id) {
      // const txn = {
      //   "validationType": "email",
      //   "validatorId": "tuumtech",
      //   "params": {
      //     "didId": "did:elastos:1234567891",
      //     "email": "test@test.com"
      //   }
      // }
      console.log("Service Invoked TSX")
      console.log(txn)
      dispatch(emailValidation(txn, () => goTo('/home')))
      dispatch(showNotification("Request submitted successfully."))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)      
    } else {
      console.log("TXN _id not found");
    }

   })

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

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
        <IonListHeader>
                  <IonLabel className="List-Header">Choose a validation provider from the list</IonLabel>
                </IonListHeader>
<br/>
        <IonItem className="" onClick={() => { sendEmailValidationRequest({ user })}}>
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/tuum-logo.jpg" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>TUUM TECH</h2>
                  </IonLabel>
                </IonItem>

                <IonItem className="" routerLink='/home/pleasewait'>
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/Rectangle -1@3x.png" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Validator Name</h2>
                  </IonLabel>
                </IonItem>

                <IonItem className="" button onClick={() => { }}>
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/Rectangle -2@3x.png" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Validator Name</h2>
                  </IonLabel>
                </IonItem>
               
        </IonCol>
        </IonRow>

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ServiceInvokePage;
