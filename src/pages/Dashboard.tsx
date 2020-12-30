import { IonImg, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Home from "./Home";
import ServiceInvoke from './ServiceInvoke';
import PleaseWait from './Pleasewait';
import Requests from './Requests';
import Profile from './Profile';
import Details from './Details';
import Support from './Support';

const Dashboard: React.FC = () => {
    console.log("I am at dashboard");
    
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/home" component={Home} exact={true} />
                <Route path="/home/service-invoke" component={ServiceInvoke} exact={true} />
                <Route path="/home/pleasewait" component={PleaseWait} exact={true} />
                <Route path="/requests" render={() => <Requests />} exact={true} />
                <Route path="/requests/details/:id" component={Details} />          
                <Route path="/profile" render={() => <Profile />} exact={true} /> 
                <Route path="/support" render={() => <Support />} exact={true} />
                {/* <Route path="/dashboard" render={() => <Redirect to="/home" />} exact={true} /> */}
                <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
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
    );
}

export default Dashboard;