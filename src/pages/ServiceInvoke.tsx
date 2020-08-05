import React, { useCallback } from 'react';


import { IonContent ,IonListHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonToolbar, useIonViewWillEnter, useIonViewWillLeave, IonRefresher, IonRefresherContent } from '@ionic/react';
import './ServiceInvoke.css';

import { useEmailValidation } from '../hooks/useEmailValidation'
import { emailValidation, showNotification, hideNotification } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';
import { getEmailValidationProviders } from '../store/providers';
import { useProvider } from '../hooks/useProvider';

import { RefresherEventDetail } from '@ionic/core';

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
      sendGetEmailValidationProvidersReq('email')      
  });

  useIonViewWillLeave(() => {
    titleBarManager.removeOnItemClickedListener(myIconListener);    
    titleBarManager.setIcon(1, {
      key: '',
      iconPath: ''
    });
  })

  const dispatch = useDispatch()

  const validationProviders = useSelector((state:AppState) => state.validationProviders)

  //Get the list of email validation providers
  const [sendGetEmailValidationProvidersReq] = useProvider((emailValidationProviders:any) => { 
    if(emailValidationProviders) {
      dispatch(getEmailValidationProviders(emailValidationProviders))
    }  
  })  

  const [sendEmailValidationRequest] = useEmailValidation((txn:any) => { 
    if(txn.data) {
      dispatch(emailValidation(txn.data, () => goTo('/home')))
      dispatch(showNotification({"message": txn.message, "type": "success", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)      
    } 
    else {
      history.push('/home');
      dispatch(showNotification({"message": txn.message, "type": "warning", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000) 
    }
   })

   let providerid = ""

  const handleValidationProviderClick = (e: any) => {
    providerid = e.currentTarget.getAttribute('data-providerid');
    signIn({ name: false, email: true, avatar: false })
  }

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
      const user = Object.assign({}, ...credSubjects)
      dispatch(login(user, () => sendEmailValidationRequest({ user: user, providerId: providerid })))    
    }
   })

   const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    sendGetEmailValidationProvidersReq('email')
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  return (
    <IonPage>
      <IonContent>

      <IonRefresher className="refresher" slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
            <IonRefresherContent
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing Requests Status...">
            </IonRefresherContent>
        </IonRefresher>

      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Email Verification</IonTitle>
        </IonToolbar>
      <IonGrid className="pad-me--top thick-padding">
        <IonRow>
        <IonCol className="Providers-List Profile">
        <IonListHeader>
                  <IonLabel className="List-Header">Choose a validation provider from the list</IonLabel>
                </IonListHeader>
<br/>

                {validationProviders.emailValidationProviders && validationProviders.emailValidationProviders.map((emailValidationProvider: any) => 
                <IonListHeader key={emailValidationProvider.id} data-providerid={emailValidationProvider.id} className="fieldContainer" style={{'padding': '0', 'maxHeight': '85px'}} onClick={(e) => handleValidationProviderClick(e)}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="3">
                        <img src={emailValidationProvider.logo} alt="" style={{'width': '64px', 'height': '64px'}}/>
                      </IonCol>
                      <IonCol size="9">

                        <IonGrid style={{'marginTop': '5px'}}>
                          <IonRow><IonCol style={{'padding': '0'}}>                  
                            <h2 style={{'margin': '0', 'padding': '0', 'fontSize': '12px'}}>{emailValidationProvider.name}</h2>
                          </IonCol></IonRow>
                          <IonRow>
                            <IonCol style={{'padding': '0', 'fontSize': '10px'}}>
                              {Object.values(emailValidationProvider.stats).reduce((a:any, b:any) => a + b, 0)} total requests
                            </IonCol>
                          </IonRow>

                          <IonRow>
                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-check.svg" />
                              <span> {emailValidationProvider.stats.Approved ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-rejected.svg" />
                              <span> {emailValidationProvider.stats.Rejected ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-wait.svg" />
                              <span> {emailValidationProvider.stats.New ?? 0}</span>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  <img style={{'width': '9px', 'height': '16px'}} alt="" src="/assets/images/components/icon-arrow.svg" />
                </IonListHeader>
                )}               
        </IonCol>
        </IonRow>

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ServiceInvokePage;
