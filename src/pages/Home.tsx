import {
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
  useIonViewWillEnter,
  IonPopover,
  IonList
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
import { login } from '../store/auth';
import { useIncomingRequests } from '../hooks/useIncomingRequests';
import { useProviderServices } from '../hooks/useProviderServices';

import CredentialCode from './CredentialCode';

const HomePage: React.FC = ({ history }: any) => {

    const [selectValidationService, setSelectValidationService] = useState<string>('none');
    const [showPopover, setShowPopover] = useState<{open: boolean, event: Event | undefined}>({
      open: false,
      event: undefined,
    });

    const handleSelectValidationService = (selectedValidationService:string) => {
      setSelectValidationService(selectedValidationService)
      setShowPopover({open: false, event: undefined})
      if(selectedValidationService !== 'none') {
        history.push({
          pathname: '/home/service-invoke',
          state: { credentialType: selectedValidationService }                              
        });
      }
    }

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
        dispatch(getProviderServices(services))
        sendGetIncomingRequests(services.id)         
      }
    }) 

    useIonViewWillEnter(() => {    
      if(!providerServices){
        // Calling the API to get provider services
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
        dispatch(getIncomingRequests(txn))
        filterIncomingTxn(txn)
      }  
     })   

     useEffect(() => {
      if(!all_requests){
        sendGetAllRequestsReq(user)
      }

      if(incoming_requests){
        filterIncomingTxn(incoming_requests)
      }

      if(!incoming_requests && providerServices && providerServices.validationTypes){
        sendGetIncomingRequests(providerServices.id)        
      }

     },
     // eslint-disable-next-line react-hooks/exhaustive-deps
     []
   );
  
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
      let pendingIncomingRequests = incoming_requests.filter((txn: any) => (txn.status === "New" || txn.status === "In progress"))
      setFilteredIncomingTxn(pendingIncomingRequests)
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
              <IonCol size="12">
                <IonPopover
                    isOpen={showPopover.open}
                    event={showPopover.event}
                    onDidDismiss={e => setShowPopover({open: false, event: undefined})}
                    cssClass='fullwidth-popover'
                >
                <IonList>
                {Object.values(CredentialCode).map(credCode => 
                  <IonItem onClick={(e) => handleSelectValidationService(credCode)}>
                    <IonImg style={{paddingRight: '20px'}} src={`../assets/images/components/icon-${credCode}.svg`}></IonImg>
                    <IonLabel>{credCode.charAt(0).toUpperCase()}{credCode.slice(1)} Validation</IonLabel>
                  </IonItem>                        
                )}
                </IonList>
                </IonPopover>
                <IonButton color="disabled" fill="solid" className="text-center" style={{'textTransform':'none', fontWeight: 'bold', width: '100%', backgroundColor: '#F8F8F8', border: '1px solid #F0F0F0', color: '#484848'}} onClick={(e) => setShowPopover({open: true, event: e.nativeEvent})}>
                  <IonRow style={{width: '100%'}}>
                      <IonCol size="2">
                        <IonImg style={{width: '24px', height: '24px'}} src={`../assets/images/components/icon-${selectValidationService}.svg`}></IonImg>
                      </IonCol>
                      <IonCol size="8" style={{top: '5px'}}>
                        {selectValidationService === 'none' ? 'Select Validation Service' : selectValidationService.charAt(0).toUpperCase() + selectValidationService.slice(1) + ' Validation'}                        
                      </IonCol>
                      <IonCol size="2" style={{top: '5px'}}>
                        <img style={{'width': '9px', 'height': '16px', transform: 'rotate(90deg)'}} alt="" src="/assets/images/components/icon-arrow.svg" />                      
                      </IonCol>
                  </IonRow>
                </IonButton>  
              </IonCol>
            </IonRow>
            <IonRow 
            style={{display: (providerServices && providerServices.validationTypes.length ? 'block' : 'none')}}
            >
              <IonCol size="12">
                {/*-- List Header with Button --*/}<br></br>
                <IonListHeader>
                  <IonLabel className="List-Header">Incoming Requests</IonLabel>
                  <IonButton size="small" color="dark" routerLink='/requests'>See All</IonButton>
                </IonListHeader>
              </IonCol>
              <IonCol class="RequestBlock">
                {/* Items Incoming Active */}
                {filteredIncomingTxn && filteredIncomingTxn[0] && filteredIncomingTxn[0].id && filteredIncomingTxn.map((txn: any) => 
                  <IonItem className="request-Item" routerLink={`/requests/details/${txn.id}`} key={txn.id} >
                  <IonThumbnail slot="start">
                    <img src={`../assets/images/components/icon-${txn.validationType}--request.svg`} alt="" />
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
                    <img src={`../assets/images/components/icon-${txn.validationType}--request.svg`} alt="" />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{txn.validationType.charAt(0).toUpperCase()}{txn.validationType.slice(1)} Validation</h2>
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
          message={'In order to proceed with Email validation, Please set the email address in Identity app and allow access while signing in to Vouch dApp.'}
          buttons={[
            {
              text: 'Re-sign In',
              cssClass: 'btn-resignin btn-center',
              handler: () => {
                // 'Sign him out and take him to sign in screen'
                // dispatch(logout(() => signIn({ name: false, email: true, phone: false, avatar: false }))) 
                signIn({ name: false, email: true, phone: false, avatar: false })                                
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
          cssClass='service-popup-alert no-image'
          header={'Could not read the Phone'}
          message={'In order to proceed with Phone validation, Please set the phone number in Identity app and allow access while signing in to Vouch dApp.'}
          buttons={[
            {
              text: 'Re-sign In',
              cssClass: 'btn-resignin btn-center',
              handler: () => {
                // 'Sign him out and take him to sign in screen'
                // dispatch(logout(() => signIn({ name: false, email: false, phone: true, avatar: false })))                
                signIn({ name: false, email: false, phone: true, avatar: false })                        
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
          isOpen={showAlertNameValidation}
          onDidDismiss={() => setShowAlertNameValidation(false)}
          cssClass='service-popup-alert no-image'
          header={'Could not read the Name'}
          message={'In order to proceed with Name validation, Please set the name in Identity app and allow access while signing in to Vouch dApp.'}
          buttons={[
            {
              text: 'Re-sign In',
              cssClass: 'btn-resignin btn-center',
              handler: () => {
                // 'Sign him out and take him to sign in screen'
                // dispatch(logout(() => signIn({ name: true, email: false, phone: false, avatar: false })))                
                signIn({ name: true, email: false, phone: false, avatar: false })                        
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

      </IonPage>
    );
  }

export default React.memo(HomePage);
