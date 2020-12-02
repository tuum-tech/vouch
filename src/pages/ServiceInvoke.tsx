import React, { useCallback } from 'react';


import { IonContent ,IonListHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonToolbar, useIonViewWillEnter, useIonViewWillLeave, IonRefresher, IonRefresherContent } from '@ionic/react';
import './ServiceInvoke.css';

// import { useEmailValidation } from '../hooks/useEmailValidation'
import { emailValidation, showNotification, hideNotification, nameValidation, telephoneValidation, genderValidation, locationValidation, birthdateValidation, birthplaceValidation, educationValidation, occupationValidation, wechatValidation, instagramValidation, facebookValidation, snapchatValidation, twitterValidation, telegramValidation, paypalValidation, elaValidation } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';

import { getBirthdateValidationProviders, getBirthplaceValidationProviders, getEducationValidationProviders, getElaValidationProviders, getEmailValidationProviders, getFacebookValidationProviders, getGenderValidationProviders, getInstagramValidationProviders, getLocationValidationProviders, getNameValidationProviders, getOccupationValidationProviders, getTelephoneValidationProviders, getSnapchatValidationProviders, getTelegramValidationProviders, getTwitterValidationProviders, getWechatValidationProviders, getPaypalValidationProviders, ValidationProviderState } from '../store/providers';
import { useProvider } from '../hooks/useProvider';

import { RefresherEventDetail } from '@ionic/core';
import { useValidation } from '../hooks/useValidation';
// import { useNameValidation } from '../hooks/useNameValidation';
// import { usePhoneValidation } from '../hooks/usePhoneValidation';

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

      switch(credentialType){
        case 'email': sendGetValidationProvidersReq('email', {}); break
        case 'name': sendGetValidationProvidersReq('name', {}); break
        case 'telephone': sendGetValidationProvidersReq('telephone', {}); break
        case 'gender': sendGetValidationProvidersReq('gender', {}); break
        case 'location': sendGetValidationProvidersReq('location', {}); break
        case 'birthdate': sendGetValidationProvidersReq('birthdate', {}); break
        case 'birthplace': sendGetValidationProvidersReq('birthplace', {}); break
        case 'education': sendGetValidationProvidersReq('education', {}); break
        case 'occupation': sendGetValidationProvidersReq('occupation', {}); break
        case 'wechat': sendGetValidationProvidersReq('wechat', {}); break
        case 'instagram': sendGetValidationProvidersReq('instagram', {}); break
        case 'facebook': sendGetValidationProvidersReq('facebook', {}); break
        case 'snapchat': sendGetValidationProvidersReq('snapchat', {}); break
        case 'twitter': sendGetValidationProvidersReq('twitter', {}); break
        case 'telegram': sendGetValidationProvidersReq('telegram', {}); break
        case 'paypal': sendGetValidationProvidersReq('paypal', {}); break
        case 'ela': sendGetValidationProvidersReq('ela', {}); break
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

  const validationProviders: ValidationProviderState = useSelector((state:AppState) => state.validationProviders)

  console.log("validationProviders");
  console.log(validationProviders);
  console.log(credentialType + "ValidationProviders");
  console.log(validationProviders[credentialType + "ValidationProviders"]);

  //Get the list of validation providers for the given service e.g. email, name, telephone etc.
  const [sendGetValidationProvidersReq] = useProvider((validationProviders:any) => { 
    console.log("validationProviders");
    console.log(validationProviders);
    if(validationProviders) {
      switch(credentialType){
        case 'email':
          dispatch(getEmailValidationProviders(validationProviders)); break;
        case 'name':
          dispatch(getNameValidationProviders(validationProviders)); break;          
        case 'telephone':
          dispatch(getTelephoneValidationProviders(validationProviders)); break;                    
        case 'gender':
          dispatch(getGenderValidationProviders(validationProviders)); break;
        case 'location':
          dispatch(getLocationValidationProviders(validationProviders)); break;          
        case 'birthdate':
          dispatch(getBirthdateValidationProviders(validationProviders)); break;                    
        case 'birthplace':
          dispatch(getBirthplaceValidationProviders(validationProviders)); break;
        case 'education':
          dispatch(getEducationValidationProviders(validationProviders)); break;          
        case 'occupation':
          dispatch(getOccupationValidationProviders(validationProviders)); break;                    
        case 'wechat':
          dispatch(getWechatValidationProviders(validationProviders)); break;
        case 'instagram':
          dispatch(getInstagramValidationProviders(validationProviders)); break;          
        case 'facebook':
          dispatch(getFacebookValidationProviders(validationProviders)); break;                    
        case 'snapchat':
          dispatch(getSnapchatValidationProviders(validationProviders)); break;
        case 'twitter':
          dispatch(getTwitterValidationProviders(validationProviders)); break;          
        case 'telegram':
          dispatch(getTelegramValidationProviders(validationProviders)); break;                    
        case 'paypal':
          dispatch(getPaypalValidationProviders(validationProviders)); break;
        case 'ela':
          dispatch(getElaValidationProviders(validationProviders)); break;          
      }
    }  
  })    

  const [sendValidationRequest] = useValidation((txn:any) => { 
    if(txn.data) {

      // let validationProvider:any = validationProviders.emailValidationProviders.filter((provider:any) => provider.id === txn.data.provider);

      let payload = {
          method: "new",
          param: {
            id: txn.data.id,
            type: credentialType,
            value: txn.data.requestParams[credentialType],
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


      switch(credentialType){
        case 'email':
          dispatch(emailValidation(txn.data, () => goTo('/home'))); break;
        case 'name':
          dispatch(nameValidation(txn.data, () => goTo('/home'))); break;          
        case 'telephone':
          dispatch(telephoneValidation(txn.data, () => goTo('/home'))); break;                    
        case 'gender':
          dispatch(genderValidation(txn.data, () => goTo('/home'))); break;                    
        case 'location':
          dispatch(locationValidation(txn.data, () => goTo('/home'))); break;                    
        case 'birthdate':
          dispatch(birthdateValidation(txn.data, () => goTo('/home'))); break;                    
        case 'birthplace':
          dispatch(birthplaceValidation(txn.data, () => goTo('/home'))); break;                    
        case 'education':
          dispatch(educationValidation(txn.data, () => goTo('/home'))); break;                    
        case 'occupation':
          dispatch(occupationValidation(txn.data, () => goTo('/home'))); break;                    
        case 'wechat':
          dispatch(wechatValidation(txn.data, () => goTo('/home'))); break;                    
        case 'instagram':
          dispatch(instagramValidation(txn.data, () => goTo('/home'))); break;                    
        case 'facebook':
          dispatch(facebookValidation(txn.data, () => goTo('/home'))); break;                    
        case 'snapchat':
          dispatch(snapchatValidation(txn.data, () => goTo('/home'))); break;                    
        case 'twitter':
          dispatch(twitterValidation(txn.data, () => goTo('/home'))); break;                    
        case 'telegram':
          dispatch(telegramValidation(txn.data, () => goTo('/home'))); break;                    
        case 'paypal':
          dispatch(paypalValidation(txn.data, () => goTo('/home'))); break;                    
        case 'ela':
          dispatch(elaValidation(txn.data, () => goTo('/home'))); break;                    
      }      

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

    let claim:any = {email: false, name: false, telephone: false, gender: false, location: false, birthdate: false, birthplace: false, education: false, occupation: false, wechat: false, instagram: false, facebook: false, snapchat: false, twitter: false, telegram: false, paypal: false, ela: false, avatar: false}

    claim[validationtype] = true

    signIn(claim)
  }

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
      const user = Object.assign({}, ...credSubjects)
      dispatch(login(user, () => sendValidationRequest({ user: user, providerId: providerid, validationType: credentialType })))
    }
   })

   const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    sendGetValidationProvidersReq(credentialType, {})
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
                  !validationProviders[credentialType + "ValidationProviders"] ||
                  !validationProviders[credentialType + "ValidationProviders"].length
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

                {validationProviders[credentialType + "ValidationProviders"] && validationProviders[credentialType + "ValidationProviders"].map((validationProvider: any) => 
                <IonListHeader key={validationProvider.id} data-validationtype={credentialType} data-providerid={validationProvider.id} className="fieldContainer" style={{'padding': '0', 'maxHeight': '85px', 'display': validationProvider.did !== user.id.split(':').pop() ? 'inline-block' : 'none' }} onClick={(e) => handleValidationProviderClick(e)}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="3">
                        <img src={validationProvider.logo} alt="" style={{'width': '64px', 'height': '64px'}}/>
                      </IonCol>
                      <IonCol size="9">

                        <IonGrid style={{'marginTop': '5px'}}>
                          <IonRow><IonCol style={{'padding': '0'}}>                  
                            <h2 style={{'margin': '0', 'padding': '0', 'fontSize': '12px'}}>{validationProvider.name}</h2>
                          </IonCol></IonRow>
                          <IonRow>
                            <IonCol style={{'padding': '0', 'fontSize': '10px'}}>
                              {Object.values(validationProvider.stats).reduce((a:any, b:any) => a + b, 0)} total requests
                            </IonCol>
                          </IonRow>

                          <IonRow>
                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-check.svg" />
                              <span> {validationProvider.stats.Approved ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-rejected.svg" />
                              <span> {validationProvider.stats.Rejected ?? 0}</span> 
                            </IonCol>

                            <IonCol style={{'paddingLeft': '0', 'fontSize': '10px'}}>
                              <img style={{'height': '8px', 'width': '8px', 'margin': '0'}} alt="" src="/assets/images/components/icon-wait.svg" />
                              <span> {Object.keys(validationProvider.stats).reduce(function (previous, key) {
if(key === 'New' || key === 'In progress'){
    return previous + validationProvider.stats[key];
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
