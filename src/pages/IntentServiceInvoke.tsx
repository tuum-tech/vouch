import React, { useCallback, useState, useEffect } from 'react';

import { IonContent ,IonListHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonLabel, IonToolbar, useIonViewWillEnter, IonRefresher, IonRefresherContent, IonButton, IonHeader, IonToast } from '@ionic/react';
import './ServiceInvoke.css';

import { emailValidation, showNotification, hideNotification, nameValidation, telephoneValidation, genderValidation, locationValidation, birthdateValidation, birthplaceValidation, educationValidation, occupationValidation, wechatValidation, instagramValidation, facebookValidation, snapchatValidation, twitterValidation, telegramValidation, paypalValidation, elaValidation, websiteValidation, twitchValidation, weiboValidation } from '../store/requests'

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'

import { getBirthdateValidationProviders, getBirthplaceValidationProviders, getEducationValidationProviders, getElaValidationProviders, getEmailValidationProviders, getFacebookValidationProviders, getGenderValidationProviders, getInstagramValidationProviders, getLocationValidationProviders, getNameValidationProviders, getOccupationValidationProviders, getTelephoneValidationProviders, getSnapchatValidationProviders, getTelegramValidationProviders, getTwitterValidationProviders, getWechatValidationProviders, getPaypalValidationProviders, ValidationProviderState, getWebsiteValidationProviders, getTwitchValidationProviders, getWeiboValidationProviders } from '../store/providers';
import { useProvider } from '../hooks/useProvider';

import { RefresherEventDetail } from '@ionic/core';
import { Storage } from '@capacitor/core';
import { useValidation } from '../hooks/useValidation';
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';

declare let appManager: AppManagerPlugin.AppManager;

const IntentServiceInvokePage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch() 
  const user = useSelector((state:AppState) => state.auth.user)  
  const [credentialType, setCredentialType] = useState('');
  const [counter, setCounter] = useState(20);
  const [showCounter, setShowCounter] = useState('');
  const notification = useSelector((state:AppState) => state.requests.notification)

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
  
      return credType;
    }

    return '';
  }

  useIonViewWillEnter(async () => {   
      const credentialType = await getIntentCredentialType();
      setCredentialType(credentialType);
  });

  useEffect(() => {
    sendGetValidationProvidersReq(credentialType, {})
  },[credentialType]);

  const validationProviders = useSelector((state:AppState) => state.validationProviders) 

  //Get the list of validation providers for the given service e.g. email, name, telephone etc.
  const [sendGetValidationProvidersReq] = useProvider((validationProviders:any) => { 
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
        case 'website':
          dispatch(getWebsiteValidationProviders(validationProviders)); break;          
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
        case 'twitch':
          dispatch(getTwitchValidationProviders(validationProviders)); break;                    
        case 'weibo':
          dispatch(getWeiboValidationProviders(validationProviders)); break;                              
        case 'paypal':
          dispatch(getPaypalValidationProviders(validationProviders)); break;
        case 'ela':
          dispatch(getElaValidationProviders(validationProviders)); break;          
      }
    }  
  })

  useEffect(() => {
    if(
        !validationProviders[credentialType + "ValidationProviders"] ||
        !validationProviders[credentialType + "ValidationProviders"].length ||
        (validationProviders[credentialType + "ValidationProviders"].some((vp:any) => vp.did === user.id.split(':').pop()) && validationProviders[credentialType + "ValidationProviders"].length === 1)
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
          Storage.remove({ 
            key: 'intentData'
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
      Storage.remove({ 
        key: 'intentData'
      }) 
      appManager.close()
    }
  }

  const [sendValidationRequest] = useValidation((txn:any) => {
    if(txn.data) {

      // let validationProvider:any = validationProviders.emailValidationProviders.filter((provider:any) => provider.id === txn.data.provider);

      let payload = {
          method: "new",
          param: {
            id: txn.data.id,
            type: credentialType,
            value: txn.data.requestParams[credentialType],
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

      switch(credentialType){
        case 'email':
          dispatch(emailValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;
        case 'name':
          dispatch(nameValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;          
        case 'telephone':
          dispatch(telephoneValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'gender':
          dispatch(genderValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'location':
          dispatch(locationValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'birthdate':
          dispatch(birthdateValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'birthplace':
          dispatch(birthplaceValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'education':
          dispatch(educationValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'occupation':
          dispatch(occupationValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'wechat':
          dispatch(wechatValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'website':
          dispatch(websiteValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'instagram':
          dispatch(instagramValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'facebook':
          dispatch(facebookValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'snapchat':
          dispatch(snapchatValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'twitter':
          dispatch(twitterValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'telegram':
          dispatch(telegramValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'twitch':
          dispatch(twitchValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'weibo':
          dispatch(weiboValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'paypal':
          dispatch(paypalValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
        case 'ela':
          dispatch(elaValidation(txn.data, () => {
            goTo('/requests/intent-details/' + txn.data.id)
          })); break;                    
      }      

      dispatch(showNotification({"message": txn.message, "type": "success", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)            
    } 
    else {
      dispatch(showNotification({"message": txn.message, "type": "warning", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
        closeIntent();
      }, 5000) 
    }
   })

   let providerid = ""

  const handleValidationProviderClick = (e: any) => {

    providerid = e.currentTarget.getAttribute('data-providerid');

    let claim:any = {publisheddid: false}
    claim[credentialType] = true

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
      <IonHeader>
        <IonToast color={notification.type} position="bottom" isOpen={notification.show} message={notification.message} />
      </IonHeader>
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
                  !validationProviders[credentialType + "ValidationProviders"].length ||
                  (validationProviders[credentialType + "ValidationProviders"].some((vp:any) => vp.did === user.id.split(':').pop()) && validationProviders[credentialType + "ValidationProviders"].length === 1)
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

              {
              (            
                (validationProviders[credentialType + "ValidationProviders"] && 
              validationProviders[credentialType + "ValidationProviders"].length > 1 && 
              validationProviders[credentialType + "ValidationProviders"].some((vp:any) => vp.did === user.id.split(':').pop()))
              
              || 
              
                (validationProviders[credentialType + "ValidationProviders"] && 
              validationProviders[credentialType + "ValidationProviders"].length > 0)              
              )
              
              &&
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
