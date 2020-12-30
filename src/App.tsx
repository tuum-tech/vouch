import React, { useEffect, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonImg
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ServiceInvoke from './pages/ServiceInvoke';
import PleaseWait from './pages/Pleasewait';
import Requests from './pages/Requests';
import Profile from './pages/Profile';
import Details from './pages/Details';
import SplashScreen from './pages/SplashScreen';
import OnBoarding from './pages/OnBoarding';
import SignIn from './pages/SignIn';
import Support from './pages/Support';
import IntentServiceInvoke from './pages/IntentServiceInvoke';
import IntentDetails from './pages/IntentDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Added CSS */
import '../node_modules/animate.css/animate.min.css';
// import url('https://fonts.googleapis.com/css?family=Poppins');

/* Theme variables */
import './theme/variables.css';
import './theme/fonts.css';
import { Storage } from '@capacitor/core';
import { useRequest } from './hooks/useRequest';
import { useSelector, useDispatch } from 'react-redux';
import { useProvider } from './hooks/useProvider';
import { AppState } from './store';
import RegisterValidator from './pages/RegisterValidator';
import { useIncomingRequestsByDid } from './hooks/useIncomingRequestsByDid';

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;
declare let notificationManager: NotificationManagerPlugin.NotificationManager;

type RPCMessage = {
  method: string;
  param: any;
}

const App: React.FC = () => {

  const history = createBrowserHistory();  

  const dispatch = useDispatch()  
  const validationProviders = useSelector((state:AppState) => state.validationProviders)
  // const user = useSelector((state:AppState) => state.auth.user)  

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
      history.go(0);
    },
    [history],
  );

  const onDeviceReady = useCallback(
    () => {

      appManager.getStartupMode((startupInfo: AppManagerPlugin.StartupInfo) => {
        if (startupInfo.startupMode === 'service'){
          console.log("I am working in the background");
          initServiceListener(dispatch);
        } else {
              appManager.setIntentListener((intent: AppManagerPlugin.ReceivedIntent) => {
                onReceiveIntent(intent, goTo, dispatch);
              });

              titleBarManager.setTitle("Vouch dApp");
              titleBarManager.setBackgroundColor("#4D2CC8");
              titleBarManager.setForegroundMode(0);

              appManager.setVisible("show");
        }
      });
    },
    [goTo, dispatch],
  );

  useEffect(() => {
    document.addEventListener('deviceready', onDeviceReady, false);
    
    return () => {
      document.removeEventListener('deviceready', onDeviceReady);
    };
  }, [onDeviceReady]);

  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/splashscreen" component={SplashScreen} exact={true} />
        <Route path="/onboarding" component={OnBoarding} exact={true} />                
        <Route path="/signin" component={SignIn} exact={true} />                      
        <Route exact path="/" render={() => <Redirect to="/splashscreen" />} />
        <Route path="/register-validator" component={RegisterValidator} exact={true} />
        <Route path="/home/intent-service-invoke" component={IntentServiceInvoke} exact={true} />
        <Route path="/requests/intent-details/:id" component={IntentDetails} />

        <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/home/service-invoke" component={ServiceInvoke} exact={true} />
          <Route path="/home/pleasewait" component={PleaseWait} exact={true} />
          <Route path="/requests" render={() => <Requests />} exact={true} />
          <Route path="/requests/details/:id" component={Details} />          
          <Route path="/profile" render={() => <Profile />} exact={true} /> 
          <Route path="/support" render={() => <Support />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonImg className="tab-icon icon-Home" src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="requests" href="/requests">
          <IonImg img-src="" className="tab-icon icon-Requests" src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Requests</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
          <IonImg className="tab-icon icon-Profile"  src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
          <IonTabButton tab="support" href="/support">
          <IonImg className="tab-icon icon-Support"  src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Support</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </IonRouterOutlet>
      {/* <Route path="/dashboard" component={Dashboard} exact={true} />       */}
    </IonReactRouter>
  </IonApp>
  )};

const initServiceListener = (dispatch:any) => {

  appManager.setListener(async (message: AppManagerPlugin.ReceivedMessage) => {
    let rpcMessage = JSON.parse(message.message) as RPCMessage;
    switch (rpcMessage.method) {
        case "new":
            // notificationManager.sendNotification({
            //     key: rpcMessage.param.id,
            //     title: `Your ${rpcMessage.param.type} validation request from ${rpcMessage.param.validator} has been generated.`,
            //     message : `${rpcMessage.param.type}:  ${rpcMessage.param.value} `
            // })

            const requestIds = await Storage.get({ key: 'pendingRequests' });

            let parsedPendingRequests:any = [];
            if(requestIds && requestIds.value){
              parsedPendingRequests = JSON.parse(requestIds.value)
              parsedPendingRequests.push(rpcMessage.param.id)
            } else {
              parsedPendingRequests.push(rpcMessage.param.id);
            }

            await Storage.set({ key: 'pendingRequests', value: JSON.stringify(parsedPendingRequests) });
            break;
        default:
            break;
    }
  });

  checkIncomingRequests();
  checkPendingRequests(dispatch);
}

const onReceiveIntent = async (intent: AppManagerPlugin.ReceivedIntent, goTo: any, dispatch: any) => {
  console.log("Intent received message:", intent.action, ". params: ", intent.params, ". from: ", intent.from);
  console.log("Trying to navigate to service invoke page from intent")

  titleBarManager.setTitle("Vouch dApp");
  titleBarManager.setBackgroundColor("#4D2CC8");
  titleBarManager.setForegroundMode(0);
  appManager.setVisible("show");

  await Storage.set({ 
    key: 'intentData', 
    value: JSON.stringify({
      "action": intent.action,
      "params": intent.params,
      "from": intent.from,
      "intentId": intent.intentId
    }) 
  });                        

  goTo('/splashscreen');

}

// store them in localstorage with the key incomingRequests 
const storeIncomingRequests = async (user: any) => {   
  sendGetIncomingRequests( user )
}

const [sendGetIncomingRequests] = useIncomingRequestsByDid(async (incomingRequests:any) => { 
  if(incomingRequests) {
    
    let newIncomingRequests = [];
    for(let i=0;i<incomingRequests.length;i++){
      if(incomingRequests[i].status === "New"){
        newIncomingRequests.push(incomingRequests[i].id)
      }
    }

    await Storage.set({ key: 'incomingRequests', value: JSON.stringify(newIncomingRequests) });                
  }  
 })

const checkIncomingRequests = async () => {

  const userdata = await Storage.get({key: 'user' })
  await storeIncomingRequests(JSON.parse(userdata.value))  

  // use hook to get all incoming requests for the user's DID and store it in localstorage
  // setTimeout to run it first time (immediately) and send notifications
  // setInterval for every minute and send notifications (for continuous monitoring if there are any new requests to be approved/rejected)

  setTimeout(async () => {
    const requestIds = await Storage.get({ key: 'incomingRequests' });

    if(requestIds && requestIds.value){
      let parsedIncomingRequests = JSON.parse(requestIds.value);
      let remainingIncomingRequests = JSON.parse(requestIds.value);

      const [sendGetRequest] = useRequest(async (response:any) => { 

        if (response != null && response.data != null){
          if(response.data.status === "New"){

            let title = `${response.data.validationType.charAt(0).toUpperCase()}${response.data.validationType.slice(1)} Validation Request ${response.data.status}`
            let message = `You have received ${response.data.validationType} validation request for the credential ${response.data.requestParams[response.data.validationType]}. Please Approve or Reject.`                              
 
            notify(response.data.id, title, message)

            remainingIncomingRequests = remainingIncomingRequests.filter((value:any) => value !== response.data.id)  
            await Storage.set({ key: 'incomingRequests', value: JSON.stringify(remainingIncomingRequests) });                
          }
        }         
      })          

      for (let i = 0; i < parsedIncomingRequests.length; i++) {
        sendGetRequest({ confirmation_id: parsedIncomingRequests[i] });
      }
    } else {
        console.log("No incoming requests to notify")
    }
   }, 0 )

  const intervalTime = (parseInt(`${process.env.REACT_APP_BACKGROUND_SERVICE_DELAY_MINUTES}`) * 60) * 1000;

  setInterval(async () => {
    const requestIds = await Storage.get({ key: 'incomingRequests' });

    if(requestIds && requestIds.value){
      let parsedIncomingRequests = JSON.parse(requestIds.value);
      let remainingIncomingRequests = JSON.parse(requestIds.value);

      const [sendGetRequest] = useRequest(async (response:any) => { 

        if (response != null && response.data != null){
          if(response.data.status === "New"){

            let title = `${response.data.validationType.charAt(0).toUpperCase()}${response.data.validationType.slice(1)} Validation Request ${response.data.status}`
            let message = `You have received ${response.data.validationType} validation request for the credential ${response.data.requestParams[response.data.validationType]}. Please Approve or Reject.`                              

            notify(response.data.id, title, message)

            remainingIncomingRequests = remainingIncomingRequests.filter((value:any) => value !== response.data.id)  
            await Storage.set({ key: 'incomingRequests', value: JSON.stringify(remainingIncomingRequests) });                
          }
        }         
      })          

      for (let i = 0; i < parsedIncomingRequests.length; i++) {
        sendGetRequest({ confirmation_id: parsedIncomingRequests[i] });
      }
    } else {
        console.log("No incoming requests to notify")
    }
   }, intervalTime )
}

const notify = (key:string, title:string, message:string) => {
  notificationManager.sendNotification({
    key: key,
    title: title,
    message: message
  })
}

const checkPendingRequests = (dispatch:any) => {

  // console.log("checkPendingRequests");
  const intervalTime = (parseInt(`${process.env.REACT_APP_BACKGROUND_SERVICE_DELAY_MINUTES}`) * 60) * 1000;

  setInterval(async () => {
    const requestIds = await Storage.get({ key: 'pendingRequests' });
    let emailValidationProviders = await Storage.get({ key: 'emailValidationProviders'});
    let nameValidationProviders = await Storage.get({ key: 'nameValidationProviders'});
    let telephoneValidationProviders = await Storage.get({ key: 'telephoneValidationProviders'});
    let genderValidationProviders = await Storage.get({ key: 'genderValidationProviders'});
    let locationValidationProviders = await Storage.get({ key: 'locationValidationProviders'});
    let birthdateValidationProviders = await Storage.get({ key: 'birthdateValidationProviders'});
    let birthplaceValidationProviders = await Storage.get({ key: 'birthplaceValidationProviders'});
    let educationValidationProviders = await Storage.get({ key: 'educationValidationProviders'});
    let occupationValidationProviders = await Storage.get({ key: 'occupationValidationProviders'});
    let websiteValidationProviders = await Storage.get({ key: 'websiteValidationProviders'});
    let wechatValidationProviders = await Storage.get({ key: 'wechatValidationProviders'});
    let instagramValidationProviders = await Storage.get({ key: 'instagramValidationProviders'});
    let facebookValidationProviders = await Storage.get({ key: 'facebookValidationProviders'});
    let snapchatValidationProviders = await Storage.get({ key: 'snapchatValidationProviders'});
    let twitterValidationProviders = await Storage.get({ key: 'twitterValidationProviders'});
    let telegramValidationProviders = await Storage.get({ key: 'telegramValidationProviders'});
    let twitchValidationProviders = await Storage.get({ key: 'twitchValidationProviders'});
    let weiboValidationProviders = await Storage.get({ key: 'weiboValidationProviders'});
    let paypalValidationProviders = await Storage.get({ key: 'paypalValidationProviders'});
    let elaValidationProviders = await Storage.get({ key: 'elaValidationProviders'});

    //Get the list of validation providers
    const [sendGetValidationProvidersReq]= useProvider((validationProviders:any) => { 
      if(validationProviders) {
        // dispatch(getNameValidationProviders(validationProviders))
        return true
      }
      return false
    })

    if(requestIds && requestIds.value){
      let parsedPendingRequests = JSON.parse(requestIds.value);
      let remainingPendingRequests = JSON.parse(requestIds.value);

      const [sendGetRequest] = useRequest(async (response:any) => {  
        if (response != null && response.data != null){
          if(response.data.status === "Approved" || response.data.status === "Rejected" || response.data.status === "Canceled"){

            let provider = {'id': response.data.provider, 'name': ''};

            switch(response.data.validationType){
              case 'email': {
                if(!emailValidationProviders || !emailValidationProviders.value){
                  sendGetValidationProvidersReq('email', async (isComplete: boolean)=> {
                    emailValidationProviders = await Storage.get({ key: 'emailValidationProviders'});                                      
                  })
                }
              } break;
              case 'name': {
                if(!nameValidationProviders || !nameValidationProviders.value){
                  sendGetValidationProvidersReq('name', async (isComplete: boolean)=> {
                    nameValidationProviders = await Storage.get({ key: 'nameValidationProviders'});                                      
                  })
                }
              } break;
              case 'telephone': {
                if(!telephoneValidationProviders || !telephoneValidationProviders.value){
                  sendGetValidationProvidersReq('telephone', async (isComplete: boolean)=> {
                    telephoneValidationProviders = await Storage.get({ key: 'telephoneValidationProviders'});                                      
                  })
                }
              } break;
              case 'gender': {
                if(!genderValidationProviders || !genderValidationProviders.value){
                  sendGetValidationProvidersReq('gender', async (isComplete: boolean)=> {
                    genderValidationProviders = await Storage.get({ key: 'genderValidationProviders'});                                      
                  })
                }
              } break;
              case 'location': {
                if(!locationValidationProviders || !locationValidationProviders.value){
                  sendGetValidationProvidersReq('location', async (isComplete: boolean)=> {
                    locationValidationProviders = await Storage.get({ key: 'locationValidationProviders'});                                      
                  })
                }
              } break;
              case 'birthdate': {
                if(!birthdateValidationProviders || !birthdateValidationProviders.value){
                  sendGetValidationProvidersReq('birthdate', async (isComplete: boolean)=> {
                    birthdateValidationProviders = await Storage.get({ key: 'birthdateValidationProviders'});                                      
                  })
                }
              } break;
              case 'birthplace': {
                if(!birthplaceValidationProviders || !birthplaceValidationProviders.value){
                  sendGetValidationProvidersReq('birthplace', async (isComplete: boolean)=> {
                    birthplaceValidationProviders = await Storage.get({ key: 'birthplaceValidationProviders'});                                      
                  })
                }
              } break;
              case 'education': {
                if(!educationValidationProviders || !educationValidationProviders.value){
                  sendGetValidationProvidersReq('education', async (isComplete: boolean)=> {
                    educationValidationProviders = await Storage.get({ key: 'educationValidationProviders'});                                      
                  })
                }
              } break;
              case 'occupation': {
                if(!occupationValidationProviders || !occupationValidationProviders.value){
                  sendGetValidationProvidersReq('occupation', async (isComplete: boolean)=> {
                    occupationValidationProviders = await Storage.get({ key: 'occupationValidationProviders'});                                      
                  })
                }
              } break;
              case 'website': {
                if(!websiteValidationProviders || !websiteValidationProviders.value){
                  sendGetValidationProvidersReq('website', async (isComplete: boolean)=> {
                    websiteValidationProviders = await Storage.get({ key: 'websiteValidationProviders'});                                      
                  })
                }
              } break;              
              case 'wechat': {
                if(!wechatValidationProviders || !wechatValidationProviders.value){
                  sendGetValidationProvidersReq('wechat', async (isComplete: boolean)=> {
                    wechatValidationProviders = await Storage.get({ key: 'wechatValidationProviders'});                                      
                  })
                }
              } break;
              case 'instagram': {
                if(!instagramValidationProviders || !instagramValidationProviders.value){
                  sendGetValidationProvidersReq('instagram', async (isComplete: boolean)=> {
                    instagramValidationProviders = await Storage.get({ key: 'instagramValidationProviders'});                                      
                  })
                }
              } break;
              case 'facebook': {
                if(!facebookValidationProviders || !facebookValidationProviders.value){
                  sendGetValidationProvidersReq('facebook', async (isComplete: boolean)=> {
                    facebookValidationProviders = await Storage.get({ key: 'facebookValidationProviders'});                                      
                  })
                }
              } break;
              case 'snapchat': {
                if(!snapchatValidationProviders || !snapchatValidationProviders.value){
                  sendGetValidationProvidersReq('snapchat', async (isComplete: boolean)=> {
                    snapchatValidationProviders = await Storage.get({ key: 'snapchatValidationProviders'});                                      
                  })
                }
              } break;
              case 'twitter': {
                if(!twitterValidationProviders || !twitterValidationProviders.value){
                  sendGetValidationProvidersReq('twitter', async (isComplete: boolean)=> {
                    twitterValidationProviders = await Storage.get({ key: 'twitterValidationProviders'});                                      
                  })
                }
              } break;
              case 'telegram': {
                if(!telegramValidationProviders || !telegramValidationProviders.value){
                  sendGetValidationProvidersReq('telegram', async (isComplete: boolean)=> {
                    telegramValidationProviders = await Storage.get({ key: 'telegramValidationProviders'});                                      
                  })
                }
              } break;
              case 'twitch': {
                if(!twitchValidationProviders || !twitchValidationProviders.value){
                  sendGetValidationProvidersReq('twitch', async (isComplete: boolean)=> {
                    twitchValidationProviders = await Storage.get({ key: 'twitchValidationProviders'});                                      
                  })
                }
              } break;              
              case 'weibo': {
                if(!weiboValidationProviders || !weiboValidationProviders.value){
                  sendGetValidationProvidersReq('weibo', async (isComplete: boolean)=> {
                    weiboValidationProviders = await Storage.get({ key: 'weiboValidationProviders'});                                      
                  })
                }
              } break;
              case 'paypal': {
                if(!paypalValidationProviders || !paypalValidationProviders.value){
                  sendGetValidationProvidersReq('paypal', async (isComplete: boolean)=> {
                    paypalValidationProviders = await Storage.get({ key: 'paypalValidationProviders'});                                      
                  })
                }
              } break;
              case 'ela': {
                if(!elaValidationProviders || !elaValidationProviders.value){
                  sendGetValidationProvidersReq('ela', async (isComplete: boolean)=> {
                    elaValidationProviders = await Storage.get({ key: 'elaValidationProviders'});                                      
                  })
                }
              } break;
            }

            let title = `${response.data.validationType.charAt(0).toUpperCase()}${response.data.validationType.slice(1)} Validation Request ${response.data.status}`
            let message = "";
            switch(response.data.status){
              case 'Approved': 
                message = `Your ${response.data.validationType} validation from ${provider.name ?? provider.id} has been approved.`
                break;              
              case 'Rejected': 
                message = `Your ${response.data.validationType} validation from ${provider.name ?? provider.id} has been rejected. Please try sending another request or choose another validator.`
                break;
              case 'Canceled':
                message = `Your ${response.data.validationType} validation from ${provider.name ?? provider.id} has been cancelled because the validator did not respond to your request in time. Please try sending another request or choose another validator.`
                break;
              default:
                message = `Your ${response.data.validationType} validation request from ${provider.name ?? provider.id} has been ${response.data.status}.`                              
            }

            notify(response.data.id, title, message)

            remainingPendingRequests = remainingPendingRequests.filter((value:any) => value !== response.data.id)  
            await Storage.set({ key: 'pendingRequests', value: JSON.stringify(remainingPendingRequests) });                
          }
        }         
      })          

      for (let i = 0; i < parsedPendingRequests.length; i++) {
        sendGetRequest({ confirmation_id: parsedPendingRequests[i] });
      }
    } else {
        console.log("No pending requests to notify")
    }
   }, intervalTime )

}

export default App;