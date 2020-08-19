import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;
declare let notificationManager: NotificationManagerPlugin.NotificationManager;

type RPCMessage = {
  method: string;
  param: any;
}

const App: React.FC = () => {

  return (
  <IonApp>
    <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/splashscreen" component={SplashScreen} exact={true} />
      <Route path="/onboarding" component={OnBoarding} exact={true} />                
      <Route path="/signin" component={SignIn} exact={true} />                      
      <Route exact path="/" render={() => <Redirect to="/splashscreen" />} />
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
    </IonReactRouter>
  </IonApp>
  )};

document.addEventListener("deviceready", () => {
  appManager.getStartupMode((startupInfo: AppManagerPlugin.StartupInfo) => {
      if (startupInfo.startupMode === 'service'){
        initServiceListener();
      } else {
          appManager.setVisible("show");

          titleBarManager.setTitle("Vouch dApp");
          titleBarManager.setBackgroundColor("#4D2CC8");
          titleBarManager.setForegroundMode(0);
      }
  });
}, false);

const initServiceListener = () => {
  appManager.setListener(async (message: AppManagerPlugin.ReceivedMessage) => {
    let rpcMessage = JSON.parse(message.message) as RPCMessage;
    switch (rpcMessage.method) {
        case "new":
            notificationManager.sendNotification({
                key: rpcMessage.param.id,
                title: `Your ${rpcMessage.param.type} validation request from ${rpcMessage.param.validator} has been generated.`,
                message : `${rpcMessage.param.type}:  ${rpcMessage.param.value} `
            })

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

  checkPendingRequests();
}

const checkPendingRequests = () => {

  const intervalTime = (parseInt(`${process.env.REACT_APP_BACKGROUND_SERVICE_DELAY_MINUTES}`) * 60) * 1000;

  setInterval(async () => {
    const requestIds = await Storage.get({ key: 'pendingRequests' });

    if(requestIds && requestIds.value){
      let parsedPendingRequests = JSON.parse(requestIds.value);
      let remainingPendingRequests = JSON.parse(requestIds.value);

      const [sendGetRequest] = useRequest(async (response:any) => {  
        if (response != null && response.data != null){
          if(response.data.status === "Approved" || response.data.status === "Rejected"){

            notificationManager.sendNotification({
              key: response.data.id,
              title: `Your ${response.data.validationType} validation request from ${response.data.provider} has been ${response.data.status}.`,
              message : `${response.data.validationType}:  ${response.data.requestParams.email} `
            })
          }

          if(response.data.status === "Approved" || response.data.status === "Rejected" || response.data.status === "Canceled") {
            remainingPendingRequests = remainingPendingRequests.filter((value:any) => value !== response.data.id)  
            await Storage.set({ key: 'pendingRequests', value: JSON.stringify(remainingPendingRequests) });                
          }
        }         
      })          

      for (let i = 0; i < parsedPendingRequests.length; i++) {
        sendGetRequest({ confirmation_id: parsedPendingRequests[i] });
      }
    } else {
        console.log("No pending requests")
    }
   }, intervalTime )

}

export default App;