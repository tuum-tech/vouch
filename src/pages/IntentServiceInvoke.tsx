import React, { useCallback, useState, useEffect } from 'react';

import { IonContent ,IonListHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonToolbar, useIonViewWillEnter, IonRefresher, IonRefresherContent, IonButton } from '@ionic/react';
import './ServiceInvoke.css';

import { useEmailValidation } from '../hooks/useEmailValidation'
import { emailValidation, showNotification, hideNotification } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'

import { getEmailValidationProviders } from '../store/providers';
import { useProvider } from '../hooks/useProvider';

import { RefresherEventDetail } from '@ionic/core';
import { Storage } from '@capacitor/core';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

const IntentServiceInvokePage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()
  const validationProviders = useSelector((state:AppState) => state.validationProviders)  
  const user = useSelector((state:AppState) => state.auth.user)  
  const [credentialType, setCredentialType] = useState('');
  const [counter, setCounter] = useState(20);
  const [showCounter, setShowCounter] = useState('');

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

  const getIntentCredentialType = async function() {
    const intentData = await Storage.get({ key: 'intentData' })
    if(intentData && intentData.value){
      console.log("intent data found at useIonViewWillEnter")
      console.log(intentData.value)

      const parsedIntentData = JSON.parse(intentData.value)

      let credType = Object.keys(parsedIntentData.params.claims)[1]; //fetching the second key as the first is DID
      // alert(parsedIntentData[credType]);

      return credType;
/*
      if ('email' in parsedIntentData.params.claims){
        return 'email';
      }*/
    }

    return '';
  }

  useIonViewWillEnter(async () => {   

      const credentialType = await getIntentCredentialType();
      setCredentialType(credentialType);
      if(credentialType === 'email'){
        sendGetEmailValidationProvidersReq('email')        
      }
  });

  useEffect(() => {

    if(
      !['email', 'name', 'phone'].includes(credentialType) ||  
      (credentialType === 'email' && !validationProviders.emailValidationProviders) ||
      (credentialType === 'name' && !validationProviders.nameValidationProviders) ||
      (credentialType === 'phone' && !validationProviders.phoneValidationProviders)
    ) {

      const timer =
        setInterval(async () => {
          setCounter(counter-1)
      
          if (counter < 10) {
            setShowCounter("0"+counter.toString());
          } else {
            setShowCounter(counter.toString());      
          }

          if(counter <= 0){
            closeIntent();
          }
      }, 1000);
      return () => clearInterval(timer);

    }
  }, [counter, credentialType, validationProviders]);

  const closeIntent = async function() {
    const intentData = await Storage.get({ key: 'intentData' })
    if(intentData && intentData.value){
      const parsedIntentData = JSON.parse(intentData.value)

      appManager.sendIntentResponse(
        parsedIntentData.action,
        {},
        parsedIntentData.intentId,
        success => {
          console.log(success)
          Storage.set({ 
            key: 'intentData', 
            value: ''
            }) 
            appManager.close()
        },
        error =>{
          console.error(error)
        }
      )

      console.log("intent response sent")
    } else {
      console.log("closing without intent response")
      Storage.set({ 
        key: 'intentData', 
        value: ''
      }) 
      appManager.close()
    }
  }

  //Get the list of email validation providers
  const [sendGetEmailValidationProvidersReq] = useProvider((emailValidationProviders:any) => { 
    if(emailValidationProviders) {
      dispatch(getEmailValidationProviders(emailValidationProviders))
    }  
  })  

  const [sendEmailValidationRequest] = useEmailValidation((txn:any) => { 
    if(txn.data) {

      // let validationProvider:any = validationProviders.emailValidationProviders.filter((provider:any) => provider.id === txn.data.provider);

      let payload = {
          method: "new",
          param: {
            id: txn.data.id,
            type: 'email',
            value: txn.data.requestParams.email,
            validator: txn.data.provider
          }
      }

      // AppManagerPlugin.MessageType.INTERNAL = 1
      // Cannot access ambient const enums when the '--isolatedModules' flag is provided.ts(2748)
      // Using the real value of the constant due to above limitation

      appManager.sendMessage("#service:backgroundservice", 1, JSON.stringify(payload), ()=>{
          // Nothing to do
          console.log("stored a request to be checked by background service")
      }, (err:any)=>{
          console.log("Failed to send RPC message to the background service", err);
      });


      dispatch(emailValidation(txn.data, () => {
        console.log('Trying to navigate to intent details page with txn id: ' + txn.data.id)
        console.log(txn.data);
        goTo('/requests/intent-details/' + txn.data.id)
      }))
//      dispatch(showNotification({"message": txn.message, "type": "success", "show": true}))

            
    } 
    else {
      dispatch(showNotification({"message": txn.message, "type": "warning", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())

        /*
        console.log("considering success")
        Storage.set({ 
          key: 'intentData', 
          value: ''
        }) 
        appManager.close()
        */

      }, 5000) 
    }
   })

   let providerid = ""

  const handleValidationProviderClick = (e: any) => {
    providerid = e.currentTarget.getAttribute('data-providerid');
    sendEmailValidationRequest({ user: user, providerId: providerid })   
  }

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
          <IonTitle className="ion-text-start">{credentialType.charAt(0).toUpperCase()}{credentialType.slice(1)} Verification</IonTitle>
        </IonToolbar>
      <IonGrid className="pad-me--top thick-padding">
        <IonRow>
        <IonCol className="Providers-List Profile">

                {
                (
                  !['email', 'name', 'phone'].includes(credentialType) ||  
                  (credentialType === 'email' && !validationProviders.emailValidationProviders) ||
                  (credentialType === 'name' && !validationProviders.nameValidationProviders) ||
                  (credentialType === 'phone' && !validationProviders.phoneValidationProviders)
                )          
                ? 
                (           
                <IonListHeader>
                  <IonGrid>
                  <IonRow>                  
                    <IonLabel className="List-Header">No validation provider available for {credentialType} credential.</IonLabel>
                  </IonRow>
                  <IonRow className="text-center" style={{'marginTop': '80px'}}>
                      <IonButton className="text-center" 
                      onClick={(e) => closeIntent()}
                      expand="block" color="tertiary" fill="solid"
                  >Close</IonButton>
                  </IonRow>
                  <IonRow className="text-center">
                    This prompt will automatically be closed in {showCounter} seconds.
                  </IonRow>
                  </IonGrid>
                </IonListHeader>
                ) 
                :
                (
                <IonListHeader>
                  <IonLabel className="List-Header">Choose a validation provider from the list</IonLabel>
                </IonListHeader>                  
                )               
                }

                {credentialType === 'email' && validationProviders.emailValidationProviders && validationProviders.emailValidationProviders.map((emailValidationProvider: any) => 
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
                              <span> {Object.keys(emailValidationProvider.stats).reduce(function (previous, key) {
if(key === 'New' || key === 'In progress'){
    return previous + emailValidationProvider.stats[key];
} else {
  return previous
}
}, 0)
}</span>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  <img style={{'width': '9px', 'height': '16px'}} alt="" src="/assets/images/components/icon-arrow.svg" />
                </IonListHeader>
                )}

                {credentialType === 'email' && validationProviders.emailValidationProviders && 
                <IonGrid>
                  <IonRow className="text-center" style={{'marginTop': '80px'}}>
                    <IonButton className="text-center" 
                    onClick={(e) => closeIntent()}
                    expand="block" color="tertiary" fill="solid">Close</IonButton>
                  </IonRow>                
                </IonGrid>                
              }

        </IonCol>
        </IonRow>

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default IntentServiceInvokePage;
