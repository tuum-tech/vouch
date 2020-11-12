import React, { useCallback } from 'react';


import { IonContent ,IonListHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonToolbar, useIonViewWillEnter, useIonViewWillLeave, IonRefresher, IonRefresherContent } from '@ionic/react';
import './ServiceInvoke.css';

import { useEmailValidation } from '../hooks/useEmailValidation'
import { emailValidation, showNotification, hideNotification, nameValidation, phoneValidation } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';

import { getEmailValidationProviders, getNameValidationProviders, getPhoneValidationProviders } from '../store/providers';
import { useProvider } from '../hooks/useProvider';

import { RefresherEventDetail } from '@ionic/core';
import { useNameValidation } from '../hooks/useNameValidation';
import { usePhoneValidation } from '../hooks/usePhoneValidation';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

const ServiceInvokePage: React.FC = ({ history }: any) => {

  const user = useSelector((state:AppState) => state.auth.user)
  
  let credentialType = ''
  if(history.location.state && history.location.state.credentialType){
    credentialType = history.location.state.credentialType
  }  

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
      console.log("Service Invoke Page searching for credentialType")
      console.log(credentialType)

      switch(credentialType){
        case 'email': sendGetEmailValidationProvidersReq('email'); break
        case 'name': sendGetNameValidationProvidersReq('name'); break
        case 'telephone': sendGetPhoneValidationProvidersReq('telephone'); break
      }
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

  //Get the list of name validation providers
  const [sendGetNameValidationProvidersReq] = useProvider((nameValidationProviders:any) => { 
    if(nameValidationProviders) {
      dispatch(getNameValidationProviders(nameValidationProviders))
    }  
  })  

  //Get the list of phone validation providers
  const [sendGetPhoneValidationProvidersReq] = useProvider((phoneValidationProviders:any) => { 
    if(phoneValidationProviders) {
      dispatch(getPhoneValidationProviders(phoneValidationProviders))
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
            validator: txn.data.provider //validationProvider.length > 0 ? validationProvider[0].name : txn.data.provider
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
      }, 5000) 
    }
   })

   const [sendNameValidationRequest] = useNameValidation((txn:any) => { 
    if(txn.data) {

      let payload = {
          method: "new",
          param: {
            id: txn.data.id,
            type: 'name',
            value: txn.data.requestParams.name,
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


      dispatch(nameValidation(txn.data, () => goTo('/home')))
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
      }, 5000) 
    }
   })

   const [sendPhoneValidationRequest] = usePhoneValidation((txn:any) => { 
    if(txn.data) {

      let payload = {
          method: "new",
          param: {
            id: txn.data.id,
            type: 'telephone',
            value: txn.data.requestParams.phone,
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


      dispatch(phoneValidation(txn.data, () => goTo('/home')))
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
      }, 5000) 
    }
   })


   let providerid = ""
   let validationtype = ""

  const handleValidationProviderClick = (e: any) => {
    providerid = e.currentTarget.getAttribute('data-providerid');
    validationtype = e.currentTarget.getAttribute('data-validationtype');

    let claim:any = {name: false, email: false, telephone: false, avatar: false}
    claim[validationtype] = true

    signIn(claim)
  }

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
      const user = Object.assign({}, ...credSubjects)
      if(validationtype === 'email'){
        dispatch(login(user, () => sendEmailValidationRequest({ user: user, providerId: providerid })))    
      }

      if(validationtype === 'name'){
        dispatch(login(user, () => sendNameValidationRequest({ user: user, providerId: providerid })))    
      }

      if(validationtype === 'telephone'){
        dispatch(login(user, () => sendPhoneValidationRequest({ user: user, providerId: providerid })))    
      }
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
        <IonTitle className="ion-text-start">{credentialType && credentialType.charAt(0).toUpperCase()}{credentialType.slice(1)} Verification</IonTitle>
      </IonToolbar>
      <IonGrid className="pad-me--top thick-padding">
        <IonRow>
        <IonCol className="Providers-List Profile">

        {
                (
                  !['email', 'name', 'telephone'].includes(credentialType) ||  
                  (credentialType === 'email' && !validationProviders.emailValidationProviders) ||
                  (credentialType === 'name' && !validationProviders.nameValidationProviders) ||
                  (credentialType === 'telephone' && !validationProviders.phoneValidationProviders)
                )          
                ? 
                (           
                <IonListHeader>
                  <IonGrid>
                  <IonRow>                  
                    <IonLabel className="List-Header">No validation provider available for {credentialType} credential.</IonLabel>
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

<br/>

                {credentialType === 'email' && validationProviders.emailValidationProviders && validationProviders.emailValidationProviders.map((emailValidationProvider: any) => 
                <IonListHeader key={emailValidationProvider.id} data-validationtype={credentialType} data-providerid={emailValidationProvider.id} className="fieldContainer" style={{'padding': '0', 'maxHeight': '85px', 'display': emailValidationProvider.did !== user.id.split(':').pop() ? 'inline-block' : 'none' }} onClick={(e) => handleValidationProviderClick(e)}>
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

{credentialType === 'name' && validationProviders.nameValidationProviders && validationProviders.nameValidationProviders.map((nameValidationProvider: any) => 
                <IonListHeader key={nameValidationProvider.id} data-validationtype={credentialType} data-providerid={nameValidationProvider.id} className="fieldContainer" style={{'padding': '0', 'maxHeight': '85px', 'display': nameValidationProvider.did !== user.id.split(':').pop() ? 'inline-block' : 'none' }} onClick={(e) => handleValidationProviderClick(e)}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="3">
                        <img src={nameValidationProvider.logo} alt="" style={{'width': '64px', 'height': '64px'}}/>
                      </IonCol>
                      <IonCol size="9">

                        <IonGrid style={{'marginTop': '5px'}}>
                          <IonRow><IonCol style={{'padding': '0'}}>                  
                            <h2 style={{'margin': '0', 'padding': '0', 'fontSize': '12px'}}>{nameValidationProvider.name}</h2>
                          </IonCol></IonRow>
                          <IonRow>
                            <IonCol style={{'padding': '0', 'fontSize': '10px'}}>
                              {Object.values(nameValidationProvider.stats).reduce((a:any, b:any) => a + b, 0)} total requests
                            </IonCol>
                          </IonRow>

                          <IonRow>
                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-check.svg" />
                              <span> {nameValidationProvider.stats.Approved ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-rejected.svg" />
                              <span> {nameValidationProvider.stats.Rejected ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-wait.svg" />
                              <span> {Object.keys(nameValidationProvider.stats).reduce(function (previous, key) {
if(key === 'New' || key === 'In progress'){
    return previous + nameValidationProvider.stats[key];
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

{credentialType === 'telephone' && validationProviders.phoneValidationProviders && validationProviders.phoneValidationProviders.map((phoneValidationProvider: any) => 
                <IonListHeader key={phoneValidationProvider.id} data-validationtype={credentialType} data-providerid={phoneValidationProvider.id} className="fieldContainer" style={{'padding': '0', 'maxHeight': '85px', 'display': phoneValidationProvider.did !== user.id.split(':').pop() ? 'inline-block' : 'none' }} onClick={(e) => handleValidationProviderClick(e)}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="3">
                        <img src={phoneValidationProvider.logo} alt="" style={{'width': '64px', 'height': '64px'}}/>
                      </IonCol>
                      <IonCol size="9">

                        <IonGrid style={{'marginTop': '5px'}}>
                          <IonRow><IonCol style={{'padding': '0'}}>                  
                            <h2 style={{'margin': '0', 'padding': '0', 'fontSize': '12px'}}>{phoneValidationProvider.name}</h2>
                          </IonCol></IonRow>
                          <IonRow>
                            <IonCol style={{'padding': '0', 'fontSize': '10px'}}>
                              {Object.values(phoneValidationProvider.stats).reduce((a:any, b:any) => a + b, 0)} total requests
                            </IonCol>
                          </IonRow>

                          <IonRow>
                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-check.svg" />
                              <span> {phoneValidationProvider.stats.Approved ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-rejected.svg" />
                              <span> {phoneValidationProvider.stats.Rejected ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-wait.svg" />
                              <span> {Object.keys(phoneValidationProvider.stats).reduce(function (previous, key) {
if(key === 'New' || key === 'In progress'){
    return previous + phoneValidationProvider.stats[key];
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



        </IonCol>
        </IonRow>

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ServiceInvokePage;
