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
  IonRefresherContent,
  useIonViewWillEnter
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import moment from 'moment'

import './Home.css';

import { RefresherEventDetail } from '@ionic/core';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store'

import { useRequests } from '../hooks/useRequests'
import { getAllRequests, getIncomingRequests } from '../store/requests'
import { useProvider } from '../hooks/useProvider'
import { getEmailValidationProviders, getProviderServices } from '../store/providers'

import { useDID } from '../hooks/useDID';
import { login, logout } from '../store/auth';
import { useIncomingRequests } from '../hooks/useIncomingRequests';
import { useProviderServices } from '../hooks/useProviderServices';

const HomePage: React.FC = ({ history }: any) => {

    const [showAlertNameValidation, setShowAlertNameValidation] = useState(false);
    const [showAlertEmailValidation, setShowAlertEmailValidation] = useState(false);
    const [showAlertPhoneValidation, setShowAlertPhoneValidation] = useState(false);
    const [filteredIncomingTxn, setFilteredIncomingTxn] = useState([
      {
        id: "",
        did: "",
        validationType: "",
        requestParams: {},
        created: "",
        status: ""
      }])

    const dispatch = useDispatch()
  
    const user = useSelector((state:AppState) => state.auth.user)  
    const all_requests = useSelector((state:AppState) => state.requests.txn)
    const incoming_requests = useSelector((state:AppState) => state.requests.incoming_txn)    
    const pending_requests = useSelector((state:AppState) => state.requests.pending_txn)
    const notification = useSelector((state:AppState) => state.requests.notification)
    const validationProviders = useSelector((state:AppState) => state.validationProviders)
    const providerServices = useSelector((state:AppState) => state.validationProviders.providerServices)

    const [sendGetProviderServices] = useProviderServices((services:any) => { 
      if(services) {
        console.log(services)
        dispatch(getProviderServices(services))

        console.log("Yeah.. Nailed it2")
        sendGetIncomingRequests(services.id)         
      }
    }) 

    useIonViewWillEnter(() => {    
      if(!providerServices){
        console.log(providerServices)
        console.log("useIonViewWillEnter Calling the API to get provider services")    
        sendGetProviderServices(user.id)
      }   
    });

    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
      sendGetAllRequestsReq(user)
      sendGetIncomingRequests(providerServices.id)

      setTimeout(() => {
        event.detail.complete();
      }, 2000);
    }

    const [sendGetAllRequestsReq] = useRequests((txn:any) => { 
      if(txn) {
        dispatch(getAllRequests(txn, () => '/home'))
      }  
     })   

     const [sendGetIncomingRequests] = useIncomingRequests((txn:any) => { 
      if(txn) {
        console.log("found incoming txns")
        console.log(txn)
        dispatch(getIncomingRequests(txn))
        filterIncomingTxn(txn)
      }  
     })   

     useEffect(() => {
      if(!all_requests){
        sendGetAllRequestsReq(user)
      }

      console.log("Incoming Requests")
      console.log(incoming_requests)
      console.log("Provider Services")
      console.log(providerServices)

      if(incoming_requests){
        filterIncomingTxn(incoming_requests)
      }

      if(!incoming_requests && providerServices && providerServices.validationTypes){
        console.log("Yeah.. Nailed it")
        sendGetIncomingRequests(providerServices.id)        
      }

      if(!validationProviders.emailValidationProviders){
        sendGetEmailValidationProvidersReq('email')
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
  
    const [signIn] = useDID((credentials:any) => {
      if(credentials.length) {
        const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
        const user = Object.assign({}, ...credSubjects)
        dispatch(login(user, () => '/home'))
      }
    })

    const relativeTime = function(datetime:any) {
      if (!datetime) return "";
  
      return moment.utc(datetime).fromNow()
    }

    const filterIncomingTxn = function(incoming_requests: any) {

      console.log("filterIncomingTxn: All incoming requests")
      console.log(incoming_requests)

      let pendingIncomingRequests = incoming_requests.filter((txn: any) => (txn.status === "New" || txn.status === "In progress"))
      setFilteredIncomingTxn(pendingIncomingRequests)

      console.log("filterIncomingTxn: Filtered incoming requests")
      console.log(pendingIncomingRequests)      
    }

    return (
      <IonPage>
        <IonHeader className="main-header">
          <IonToolbar>
            <IonImg className="Navbar-Logo" src="../assets/images/components/empty.png"></IonImg>
          </IonToolbar>
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
            <IonTitle className="ion-text-start Iontitle-Big">
              <IonRow>
                <IonCol size="2" style={{padding: '0'}}>
                  <img className="avatar-home" alt=""
                      src={`${user && user.avatar ? user.avatar : "../assets/images/components/default-avatar.png" }`
                      } />
                </IonCol>
                <IonCol size="10" style={{padding: '0', paddingLeft: '5px'}}>
                  Welcome, <br /> <strong> {user && user.name}</strong>
                </IonCol>
              </IonRow>
            </IonTitle>
          </IonToolbar>
          <IonGrid className="pad-me--top ">
          <IonRow>
              <IonCol size="12">
                <IonListHeader>
                  <IonButton fill="solid" color="secondary" className="text-center" routerLink='/register-validator' style={{'textTransform':'none', fontWeight: 'bold'}}>Register as a Validator</IonButton>
                </IonListHeader>
              </IonCol>
          </IonRow>

            <IonRow className="main-Services">
              <IonCol size="12">
                <IonListHeader>
                  <IonLabel className="List-Header">Validation Services</IonLabel>
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
                        <IonImg src="../assets/images/components/icon-email.svg"></IonImg>
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
                        {/* <IonImg src={user && user.telephone ? "../assets/images/components/icon-phone.svg" : "../assets/images/components/icon-phone--disabled.svg"}></IonImg>                         */}
                        <IonImg src="../assets/images/components/icon-phone.svg"></IonImg>
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
                        {/* <IonImg src={user && user.name ? "../assets/images/components/icon-name.svg" : "../assets/images/components/icon-name--disabled.svg"}></IonImg> */}
                        <IonImg src="../assets/images/components/icon-name.svg"></IonImg>
                      </IonCol>
                      <IonCol>
                        Name <br />  Validation
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard></IonCol>
            </IonRow>
            <IonRow style={{display: (providerServices && providerServices.validationTypes.length ? 'block' : 'none')}}>
              <IonCol size="12">
                {/*-- List Header with Button --*/}<br></br>
                <IonListHeader>
                  <IonLabel className="List-Header">Incoming Requests</IonLabel>
                  <IonButton size="small" color="dark" routerLink='/requests'>See All</IonButton>
                </IonListHeader>
              </IonCol>
              <IonCol class="RequestBlock">
                {/* Items Incoming Active */}
                {filteredIncomingTxn && filteredIncomingTxn.map((txn: any) => 
                  <IonItem className="request-Item" routerLink={`/requests/details/${txn.id}`} key={txn.id} >
                  <IonThumbnail slot="start">
                    <img src="../assets/images/components/icon-email--request.svg" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h5>{txn.did}</h5>
                    <h4>{txn.validationType.charAt(0).toUpperCase()}{txn.validationType.slice(1)}: {txn.requestParams[txn.validationType]}</h4>
                    <p>{relativeTime(txn.created)}</p>
                  </IonLabel>
                  <IonButton shape="round" className="status" color={`${txn.status === "New" ? "light" : ""}${txn.status === "In progress" ? "primary" : ""}`} 
                    slot="end">
                      {`
                        ${txn.status === "New" ? "New" : ""}
                        ${txn.status === "In progress" ? "In Progress" : ""}
                      `}                      
                      </IonButton>                  
                </IonItem>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                {/*-- List Header with Button --*/}<br></br>
                <IonListHeader>
                  <IonLabel className="List-Header">My Requests</IonLabel>
                  <IonButton size="small" color="dark" routerLink='/requests'>See All</IonButton>
                </IonListHeader>
              </IonCol>
              <IonCol class="RequestBlock">
                {/* Items Active */}
                {pending_requests && pending_requests.map((txn: any) => 
                  <IonItem className="request-Item" routerLink={`/requests/details/${txn.id}`} key={txn.id} >
                  <IonThumbnail slot="start">
                    <img src="../assets/images/components/icon-email--request.svg" alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>Email Validation</h2>
                    <p>{relativeTime(txn.created)}</p>
                  </IonLabel>
                  <IonButton shape="round" className="status" color={`${(txn.status === "New" || txn.status === 'Cancelation in progress') ? "light" : ""}${txn.status === "In progress" ? "primary" : ""}`} 
                    slot="end">
                      {`
                        ${txn.status === "New" ? "New" : ""}
                        ${txn.status === "In progress" ? "In Progress" : ""}
                        ${txn.status === "Cancelation in progress" ? "Cancelling" : ""}
                      `}                      
                      </IonButton>                  
                </IonItem>

                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonAlert
          isOpen={showAlertEmailValidation}
          onDidDismiss={() => setShowAlertEmailValidation(false)}
          cssClass='service-popup-alert no-image'
          header={'Could not read the Email'}
          message={'In order to proceed with Email validation, Please set the visibility of your email address to Public.'}
          buttons={[
            {
              text: 'Re-sign In',
              cssClass: 'btn-resignin btn-center',
              handler: () => {
                // 'Sign him out and take him to sign in screen'
                dispatch(logout(() => signIn({ name: false, email: true, avatar: false })))                
              }
            },
            {
              text: 'OK',
              role: 'cancel',
              cssClass: 'btn-center',
              handler: blah => {
                // console.log('OK');
              }
            }            
          ]}
        />        

        <IonAlert
          isOpen={showAlertPhoneValidation}
          onDidDismiss={() => setShowAlertPhoneValidation(false)}
          cssClass='service-popup-alert custom-info'
          header={'Service Unavailable'}
          message={'There are currently no validators available to validate phone numbers.'}
          buttons={['OK']}
        />

        <IonAlert
          isOpen={showAlertNameValidation}
          onDidDismiss={() => setShowAlertNameValidation(false)}
          cssClass='service-popup-alert custom-info'
          header={'Service Unavailable'}
          message={'There are currently no validators available to validate name.'}
          buttons={['OK']}
        />        

      </IonPage>
    );
  }

export default React.memo(HomePage);
