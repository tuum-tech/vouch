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
import { getEmailValidationProviders, getNameValidationProviders, getTelephoneValidationProviders } from './store/providers';

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
import Dashboard from './pages/Dashboard';

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

//   //Get the list of email validation providers  
//   useEffect(() => {
//       if(!validationProviders.emailValidationProviders){
//         sendGetEmailValidationProvidersReq('email')
//       }
//      },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//    );

  //Get the list of validation providers
  // const [sendGetValidationProvidersReq] = useProvider((validationProviders:any) => { 
  //   if(validationProviders) {
  //     // switch()
  //     dispatch(getEmailValidationProviders(validationProviders))
  //   }  
  // })

// //Get the list of name validation providers  
//   useEffect(() => {
//     if(!validationProviders.nameValidationProviders){
//       sendGetNameValidationProvidersReq('name')
//     }
//    },
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   []
//  );

// //Get the list of name validation providers
// const [sendGetNameValidationProvidersReq] = useProvider((nameValidationProviders:any) => { 
//   if(nameValidationProviders) {
//     dispatch(getNameValidationProviders(nameValidationProviders))
//   }  
// })

// //Get the list of phone validation providers
// useEffect(() => {
//   if(!validationProviders.telephoneValidationProviders){
//     sendGetTelephoneValidationProvidersReq('telephone')
//   }
//  },
// // eslint-disable-next-line react-hooks/exhaustive-deps
// []
// );

// //Get the list of phone validation providers
// const [sendGetTelephoneValidationProvidersReq] = useProvider((telephoneValidationProviders:any) => { 
// if(telephoneValidationProviders) {
//   dispatch(getTelephoneValidationProviders(telephoneValidationProviders))
// }  
// })

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
      {/* <Route path="/dashboard" component={Dashboard} exact={true} /> */}
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
  console.log("storing incoming requests for notification");
  sendGetIncomingRequests( user )
}

const [sendGetIncomingRequests] = useIncomingRequestsByDid(async (incomingRequests:any) => { 
  if(incomingRequests) {
    console.log("stored successfully");
    
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
    console.log("got incoming requests list");
    console.log(requestIds);
    
    

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

  console.log("checkPendingRequests");
  const intervalTime = (parseInt(`${process.env.REACT_APP_BACKGROUND_SERVICE_DELAY_MINUTES}`) * 60) * 1000;
  // const dispatchValidationProviders = useDispatch()

  setInterval(async () => {
    const requestIds = await Storage.get({ key: 'pendingRequests' });
    let emailValidationProviders = await Storage.get({ key: 'emailValidationProviders'});
    let nameValidationProviders = await Storage.get({ key: 'nameValidationProviders'});
    // let telephoneValidationProviders = await Storage.get({ key: 'telephoneValidationProviders'});

    console.log("setInterval");
    console.log(nameValidationProviders);

    //Get the list of validation providers
    const [sendGetValidationProvidersReq]= useProvider((validationProviders:any) => { 
      if(validationProviders) {
        // switch()
        // dispatchValidationProviders(getEmailValidationProviders(validationProviders))
        dispatch(getEmailValidationProviders(validationProviders))
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

            if(response.data.validationType === 'email'){
              console.log("Before if !emailValidationProviders || !emailValidationProviders.value")
              if(!emailValidationProviders || !emailValidationProviders.value){
                  console.log("inside if")
                  sendGetValidationProvidersReq('email', async (isComplete: boolean)=> {
                    console.log("did i get the result: " + isComplete);
                    emailValidationProviders = await Storage.get({ key: 'emailValidationProviders'});                                      
                  })

                  // setTimeout(async() => {
                  //   console.log("finding val providers if set or not")
                  //   emailValidationProviders = await Storage.get({ key: 'emailValidationProviders'});                  
                  //   console.log("emailValidationProviders")
                  //   console.log(emailValidationProviders)
                  //   if(!emailValidationProviders || !emailValidationProviders.value){
                  //     console.log("Parsing emailvalidation providers value");                      
                  //     provider = JSON.parse(emailValidationProviders.value).filter((provider:any) => provider.id === response.data.provider)[0]
                  //   }
                  // }, 500)
                }
              }
            // }

            // if(response.data.validationType === 'name'){
            //   provider = JSON.parse(nameValidationProviders.value).filter((provider:any) => provider.id === response.data.provider)[0]
            // }

            // if(response.data.validationType === 'telephone'){
            //   provider = JSON.parse(telephoneValidationProviders.value).filter((provider:any) => provider.id === response.data.provider)[0]
            // }

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