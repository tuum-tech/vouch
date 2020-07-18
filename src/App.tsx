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

declare let appManager: AppManagerPlugin.AppManager;
declare let titleBarManager: TitleBarPlugin.TitleBarManager;

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
          <Route path="/home" render={() => <Home />} exact={true} />
          <Route path="/home/service-invoke" component={ServiceInvoke} exact={true} />
          <Route path="/home/pleasewait" component={PleaseWait} exact={true} />
          <Route path="/requests" render={() => <Requests />} exact={true} />
          <Route path="/requests/details/:id" component={Details} />
          <Route path="/profile" render={() => <Profile />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonImg class="tab-icon icon-Home" src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="requests" href="/requests">
          <IonImg img-src="" class="tab-icon icon-Requests" src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Requests</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
          <IonImg class="tab-icon icon-Profile"  src="../assets/images/components/empty.png"></IonImg>
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

document.addEventListener("deviceready", () => {
  appManager.setVisible("show");

  titleBarManager.setTitle("Vouch dApp");
  titleBarManager.setBackgroundColor("#4D2CC8");
  titleBarManager.setForegroundMode(0);

}, false);

export default App;