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
  IonThumbnail,
  IonToast,
  IonAlert,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import React, { useCallback, useState, useEffect } from 'react';

import './Home.css';

import { RefresherEventDetail } from '@ionic/core';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'

import { useRequests } from '../hooks/useRequests'
import { getAllRequests } from '../store/requests'
import { useProvider } from '../hooks/useProvider'
import { getEmailValidationProviders } from '../store/providers'

import { logout } from '../store/auth'

const HomePage: React.FC = ({ history }: any) => {

    const [showAlertNameValidation, setShowAlertNameValidation] = useState(false);
    const [showAlertEmailValidation, setShowAlertEmailValidation] = useState(false);
    const [showAlertPhoneValidation, setShowAlertPhoneValidation] = useState(false);

    const dispatch = useDispatch()
  
    const user = useSelector((state:AppState) => state.auth.user)  
    const requests = useSelector((state:AppState) => state.requests)
    const validationProviders = useSelector((state:AppState) => state.validationProviders)

    console.log("State in home")
    console.log(requests)

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
      sendGetAllRequestsReq(user)

      setTimeout(() => {
        event.detail.complete();
      }, 2000);
    }

    const [sendGetAllRequestsReq] = useRequests((txn:any) => { 
      if(txn) {
        console.log("Service Invoked TSX Get Requests")
        console.log(txn)
        dispatch(getAllRequests(txn, () => goTo('/home')))
      }  
     })   

    useEffect(() => {
        if(!requests.txn){
          sendGetAllRequestsReq(user)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    //Get the list of email validation providers
    const [sendGetEmailValidationProvidersReq] = useProvider((emailValidationProviders:any) => { 
      if(emailValidationProviders) {
        dispatch(getEmailValidationProviders(emailValidationProviders))
      }  
    })   
  
    if(!validationProviders.emailValidationProviders){
      sendGetEmailValidationProvidersReq('email')
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
          <IonToast color={requests.notification.type} position="bottom" isOpen={requests.notification.show} message={requests.notification.message} />
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
                {/* <IonCard routerLink={user && user.email ? '/home/service-invoke' : ''}> */}
                <IonCard onClick={e => {
                          e.preventDefault();
                          if(user && user.email){
                            history.push('/home/service-invoke');
                          } else { 
                            //show alert
                            setShowAlertEmailValidation(true);
                          }
                        }}>
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        {/* <IonImg src={user && user.email ? "/assets/images/ui components/icon-Email.svg" : "/assets/images/ui components/icon-Email--Disabled.svg"}></IonImg> */}
                        <IonImg src="/assets/images/ui components/icon-Email.svg"></IonImg>
                      </IonCol>
                      <IonCol>
                        Email <br />  Validation 
                      </IonCol>
                    </IonRow>

                  </IonCardContent >
                </IonCard>
              </IonCol>
                <IonCol size="6">
                {/* <IonCard routerLink={user && user.telephone ? '/home/service-invoke' : ''}>                 */}
                <IonCard onClick={() => setShowAlertPhoneValidation(true)}>
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        {/* <IonImg src={user && user.telephone ? "/assets/images/ui components/icon-Phone.svg" : "/assets/images/ui components/icon-Phone--Disabled.svg"}></IonImg>                         */}
                        <IonImg src="/assets/images/ui components/icon-Phone.svg"></IonImg>
                      </IonCol>
                      <IonCol>
                        Phone <br />  Validation
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard></IonCol><IonCol size="6">
                {/* <IonCard routerLink={user && user.telephone ? '/home/service-invoke' : ''}>                 */}
                <IonCard onClick={() => setShowAlertNameValidation(true)}>
                  <IonCardContent>
                    <IonRow>
                      <IonCol>
                        {/* <IonImg src={user && user.name ? "/assets/images/ui components/icon-name.svg" : "/assets/images/ui components/icon-name--Disabled.svg"}></IonImg> */}
                        <IonImg src="/assets/images/ui components/icon-name.svg"></IonImg>
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
                {requests.pending_txn && requests.pending_txn.map((txn: any) => 
                  <IonItem className="request-Item" routerLink={`/requests/details/${txn.id}`} key={txn.id} >
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
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonAlert
          isOpen={showAlertEmailValidation}
          onDidDismiss={() => setShowAlertEmailValidation(false)}
          cssClass='service-popup-alert'
          header={'Could not read the Email'}
          subHeader={'Please provide access to read Email'}
          message={'In order to proceed with Email validation, Please resign and provide permission to access your email address.'}
          buttons={[
            {
              text: 'Resign In',
              handler: () => {
                // 'Sign him out and take him to sign in screen'
                dispatch(logout(() => goTo('/signin')))
              }
            },
            {
              text: 'Close',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Close');
              }
            }            
          ]}
        />        

        <IonAlert
          isOpen={showAlertPhoneValidation}
          onDidDismiss={() => setShowAlertPhoneValidation(false)}
          cssClass='service-popup-alert'
          header={'Service Unavailable'}
          subHeader={'No Phone Validator Found'}
          message={'There are currently no validators available to validate phone numbers.'}
          buttons={['Close']}
        />

        <IonAlert
          isOpen={showAlertNameValidation}
          onDidDismiss={() => setShowAlertNameValidation(false)}
          cssClass='service-popup-alert'
          header={'Service Unavailable'}
          subHeader={'No Name Validator Found'}
          message={'There are currently no validators available to validate name.'}
          buttons={['Close']}
        />        

      </IonPage>
    );
  }

export default HomePage;
