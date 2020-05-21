import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonRow, IonCol,
  IonListHeader,
  IonLabel,
  IonButton,
  IonGrid,
  IonItem,
  IonThumbnail


} from '@ionic/react';
import React, { useEffect, useCallback } from 'react';
import './Home.css';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'

import { useRequests } from '../hooks/useRequests'
import { getAllRequests } from '../store/requests'



// class HomePage extends React.Component {
const HomePage: React.FC = ({ history }: any) => {
  // render() {

    const dispatch = useDispatch()
  
    const user = useSelector((state:AppState) => state.auth.user)  
    const requests = useSelector((state:AppState) => state.txn)

    console.log("State in home")
    console.log(requests)



    const [sendGetAllRequestsReq] = useRequests((txn:any) => { 

      if(txn) {

        console.log("Service Invoked TSX Get Requests")
        console.log(txn)
        dispatch(getAllRequests(txn, () => goTo('/home')))
      } else {
        console.log("TXN is blank or not found");
      }
  
     })   
  
    if(!requests.txn){
      // console.log("Calling get request");
      // const userinfo = {
      //     "id": "did:elastos:ia7ooqJoKVQTfndxdHtcYep3XmLM1k85ta",
      //     "email": "testing@testing.com"
      // };
      // sendGetAllRequestsReq(userinfo)
      sendGetAllRequestsReq(user)
    }


  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );


    return (
      <IonPage>
        <IonHeader className="main-header">
          <IonToolbar>
            <IonImg className="Navbar-Logo" src="/assets/images/ui components/empty.png"></IonImg>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonToolbar className="sub-header">
    <IonTitle className="ion-text-start Iontitle-Big">Welcome, <br /> <strong> {user && user.name}</strong></IonTitle>
          </IonToolbar>
          <IonGrid className="pad-me--top ">
            <IonRow className="main-Services">
              <IonCol size="12">
                <IonListHeader>
                  <IonLabel className="List-Header">Available Services</IonLabel>
                </IonListHeader>
              </IonCol>
              <IonCol size="6">
                <IonCard routerLink={user && user.email ? '/home/service-invoke' : ''}>
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        <IonImg src={user && user.email ? "/assets/images/ui components/icon-Email.svg" : "/assets/images/ui components/icon-Email--Disabled.svg"}></IonImg>
                      </IonCol>
                      <IonCol>
                        Email <br />  Validation 
                      </IonCol>
                    </IonRow>

                  </IonCardContent >
                </IonCard>
              </IonCol>
                <IonCol size="6">
                {/* <IonCard button onClick={() => { }}> */}
                <IonCard routerLink={user && user.telephone ? '/home/service-invoke' : ''}>                
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        <IonImg src={user && user.telephone ? "/assets/images/ui components/icon-Phone.svg" : "/assets/images/ui components/icon-Phone--Disabled.svg"}></IonImg>
                      </IonCol>
                      <IonCol>
                        Phone <br />  Validation
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard></IonCol><IonCol size="6">
                {/* <IonCard button onClick={() => { }}> */}
                <IonCard routerLink={user && user.name ? '/home/service-invoke' : ''}>
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        <IonImg src={user && user.name ? "/assets/images/ui components/icon-name.svg" : "/assets/images/ui components/icon-name--Disabled.svg"}></IonImg>
                      </IonCol>
                      <IonCol>
                        Name <br />  Validation
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                {/*-- List Header with Button --*/}<br></br>
                <IonListHeader>
                  <IonLabel className="List-Header">Active Requests</IonLabel>
                  <IonButton size="small" color="light" routerLink='/requests'>See All</IonButton>
                </IonListHeader>
              </IonCol>
              <IonCol>
                {/* Items Active */}
                {requests.txn && requests.txn.map((txn: any) =>
                  <IonItem className="request-Item" routerLink={`/requests/details/${txn._id}`} key={txn._id} >
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/icon-Email--request.svg" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Email Validation</h2>
                    <p>{txn.createdIn}</p>
                  </IonLabel>
                <IonButton fill="outline" slot="end">{txn.status}</IonButton>
                </IonItem>
                )}

                {/* <IonItem className="request-Item" button onClick={() => { }} >
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/icon-Email@3x.png" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Email Validation</h2>
                    <p>{requests.txn && requests.txn.txn && requests.txn.txn[0]}</p>
                  </IonLabel>
                  <IonButton fill="outline" slot="end">Pending</IonButton>
                </IonItem> */}
                {/* <IonItem className="request-Item" button onClick={() => { }}>
                  <IonThumbnail slot="start">
                    <img src="/assets/images/ui components/icon-name--request.svg" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Name Validation</h2>
                    <p>23 Minutes Ago</p>
                  </IonLabel>
                  <IonButton fill="outline" slot="end">Pending</IonButton>
                </IonItem> */}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  // closeApp() {
  //   console.log("dApp is closing!")
  //   appManager.close();
  // }
// }

export default HomePage;
