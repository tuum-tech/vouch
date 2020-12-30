import React, { useCallback } from 'react';
import { IonContent, IonPage, IonTitle,IonListHeader, IonGrid,IonRow,IonCol,IonLabel,IonToolbar, IonTextarea, IonIcon, IonButton, useIonViewWillEnter, useIonViewWillLeave, IonImg, useIonViewDidEnter } from '@ionic/react';
import './Details.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { useParams } from 'react-router-dom';
import { useCredSaver } from '../hooks/useCredSaver';
import { useCredSaved } from '../hooks/useCredSaved';
import { showNotification, hideNotification, credSaved, requestCancelled, requestApproved, requestRejected } from '../store/requests';
import moment from 'moment'
import { useCancelRequest } from '../hooks/useCancelRequest';
import { useApproveRequest } from '../hooks/useApproveRequest';
import { useRejectRequest } from '../hooks/useRejectRequest';
import { useCredIssue } from '../hooks/useCredIssue';
import { useProvider } from '../hooks/useProvider';
import { getBirthdateValidationProviders, getBirthplaceValidationProviders, getEducationValidationProviders, getElaValidationProviders, getEmailValidationProviders, getFacebookValidationProviders, getGenderValidationProviders, getInstagramValidationProviders, getLocationValidationProviders, getNameValidationProviders, getOccupationValidationProviders, getPaypalValidationProviders, getSnapchatValidationProviders, getTelegramValidationProviders, getTelephoneValidationProviders, getTwitchValidationProviders, getTwitterValidationProviders, getWebsiteValidationProviders, getWechatValidationProviders, getWeiboValidationProviders, ValidationProviderState } from '../store/providers';
import { Storage } from '@capacitor/core';

declare let titleBarManager: TitleBarPlugin.TitleBarManager;

const DetailsPage: React.FC = ({ history }: any) => {

  const goTo = useCallback(
    (path: string, direction:string = 'forward') => {
      history.push(path, { direction: direction });
    },
    [history],
  );

  let myIconListener = (menuIcon:any) => {
    if (menuIcon.key === "back") {
        goTo('/requests', 'back')
    }
  };

  useIonViewWillLeave(() => {
    titleBarManager.removeOnItemClickedListener(myIconListener);    
    titleBarManager.setIcon(1, {
      key: '',
      iconPath: ''
    });
  })

  const dispatch = useDispatch()

  const requests = useSelector((state:AppState) => state.requests)
  const { id } = useParams()
  let requestType:string = 'outgoing'

  let requestDetails:any = []

  let provider:any = {
    'did': '',
    'name': '', 
    'logo': '', 
    'validation': {}
  }; 

  provider.validation[requestDetails.validationType] = {
    'next_steps': []
  }

    //Check all outgoing transactions
    if(requests && requests.txn)
      requestDetails = requests.txn.filter((txn: any) => txn.id === id)

    //Check all incoming transactions  
    if(!requestDetails.length){
        requestDetails = requests.incoming_txn.filter((txn: any) => txn.id === id)
        requestType = "incoming"
    }

    if(requestDetails){
      requestDetails = requestDetails[0]
    }

  useIonViewWillEnter(() => {    

    titleBarManager.setIcon(1, {
      key: "back",
      iconPath: "back"
    });

    titleBarManager.addOnItemClickedListener(myIconListener);

    switch(requestDetails.validationType){
      case 'email': sendGetValidationProvidersReq('email', {}); break
      case 'name': sendGetValidationProvidersReq('name', {}); break
      case 'telephone': sendGetValidationProvidersReq('telephone', {}); break
      case 'gender': sendGetValidationProvidersReq('gender', {}); break
      case 'location': sendGetValidationProvidersReq('location', {}); break
      case 'birthdate': sendGetValidationProvidersReq('birthdate', {}); break
      case 'birthplace': sendGetValidationProvidersReq('birthplace', {}); break
      case 'education': sendGetValidationProvidersReq('education', {}); break
      case 'occupation': sendGetValidationProvidersReq('occupation', {}); break
      case 'website': sendGetValidationProvidersReq('website', {}); break
      case 'wechat': sendGetValidationProvidersReq('wechat', {}); break
      case 'instagram': sendGetValidationProvidersReq('instagram', {}); break
      case 'facebook': sendGetValidationProvidersReq('facebook', {}); break
      case 'snapchat': sendGetValidationProvidersReq('snapchat', {}); break
      case 'twitter': sendGetValidationProvidersReq('twitter', {}); break
      case 'telegram': sendGetValidationProvidersReq('telegram', {}); break
      case 'twitch': sendGetValidationProvidersReq('twitch', {}); break
      case 'weibo': sendGetValidationProvidersReq('weibo', {}); break
      case 'paypal': sendGetValidationProvidersReq('paypal', {}); break
      case 'ela': sendGetValidationProvidersReq('ela', {}); break
    }    
  })


  const validationProviders:ValidationProviderState = useSelector((state:AppState) => state.validationProviders)

  if(validationProviders[requestDetails.validationType + "ValidationProviders"]){
    provider = validationProviders[requestDetails.validationType + "ValidationProviders"].filter((provider:any) => provider.id === requestDetails.provider)[0]
  }

  //Get the list of validation providers for the given service e.g. email, name, telephone etc.
  const [sendGetValidationProvidersReq] = useProvider((validationProviders:any) => { 
    if(validationProviders) {
      switch(requestDetails.validationType){
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

  const copyText = function (elementId: any){
    let copyText:any = document.querySelector("#" + elementId);
    let inputField = copyText.getElementsByTagName("textarea")[0];
    inputField.select();
    document.execCommand("copy");   
    dispatch(showNotification({"message": "Copied to clipboard", "type": "primary", "show": true})) 
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)           
  }

  const formatTime = function(datetime:any) {
    if (!datetime) return "";

    return moment.utc(datetime).format('MMMM Do YYYY, h:mm:ss a')    
  }   


  const [sendCredSaveIntent] = useCredSaver((credentials:any) => { 
      const confirmation_id = requestDetails.id
      sendCredSaved({ confirmation_id });
   })

   const [sendCredSaved] = useCredSaved((response:any) => {
    dispatch(credSaved(response))
    dispatch(showNotification({"message": response.message, "type": "success", "show": true}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)           
   })

   const handleCancelRequestClick = (e:any) => {
    const confirmation_id = requestDetails.id
    sendCancelRequest({ confirmation_id });
   }

   const [sendCredIssueIntent] = useCredIssue((credentials:any) => { 
     sendApproveRequest({ 
       confirmationId: requestDetails.id,
       verifiedCredential: credentials
     });
   })

   const handleApproveRequestClick = (e:any) => {

    const validationtype = e.currentTarget.getAttribute('data-validationtype')

    //Sign the credential with validators DID using credissue intent
    let credIssueRequestData:any = {}
    credIssueRequestData.identifier = validationtype    
    credIssueRequestData.types = ["VerifiableCredential"]
    credIssueRequestData.subjectdid = "did:elastos:" + requestDetails.did.replace("did:elastos:", "")
    credIssueRequestData.properties = {}

    switch(validationtype) {
      case 'email': 
      case 'name': 
      case 'telephone':
      case 'gender':
      case 'location':
      case 'birthdate':
      case 'birthplace':
      case 'education':
      case 'occupation':
      case 'website':       
      {
        let type = validationtype.charAt(0).toUpperCase() + validationtype.slice(1)
        credIssueRequestData.types.push(type + "Credential")
        credIssueRequestData.types.push("BasicProfileCredential")

        credIssueRequestData.properties[validationtype] = requestDetails.requestParams[validationtype]                
      } break;
      case 'wechat':
      case 'instagram':
      case 'facebook':
      case 'snapchat':
      case 'twitter':
      case 'telegram':
      case 'twitch':
      case 'weibo':
      case 'paypal':
      case 'ela':
      {
        let type = validationtype.charAt(0).toUpperCase() + validationtype.slice(1)
        credIssueRequestData.types.push(type + "Credential")
        credIssueRequestData.types.push("InternetAccountCredential")

        credIssueRequestData.properties[validationtype] = requestDetails.requestParams[validationtype]                
      } break;        
      default: {
        let type = validationtype.charAt(0).toUpperCase() + validationtype.slice(1)
        credIssueRequestData.types.push(type + "Credential")
        credIssueRequestData.types.push("BasicProfileCredential")

        credIssueRequestData.properties[validationtype] = requestDetails.requestParams[validationtype]        
      }
    }

    let d = new Date();
    credIssueRequestData.expirationdate = new Date(d.getFullYear() + 5, d.getMonth(), d.getDate()).toISOString() // Credential will expire on 2025-10-10 - Note the month's 0-index...

    sendCredIssueIntent(credIssueRequestData)
   }

   const handleRejectRequestClick = (e:any) => {
    const confirmation_id = requestDetails.id
    sendRejectRequest({ confirmation_id });
   }   

   const [sendCancelRequest] = useCancelRequest((response:any) => {
    dispatch(requestCancelled(response))
    dispatch(showNotification({"message": response.message, "type": "success", "show": true}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)           
   })

   const [sendApproveRequest] = useApproveRequest((response:any) => {
    dispatch(requestApproved(response, () => goTo('/home')))
    dispatch(showNotification({"message": response.message, "type": "success", "show": true}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)           
   })

   const [sendRejectRequest] = useRejectRequest((response:any) => {
    dispatch(requestRejected(response, () => goTo('/home')))
    dispatch(showNotification({"message": response.message, "type": "success", "show": true}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)           
   })   

  const handleSaveCredClick = (e: any) => {
    let verifiedCredential = requestDetails.verifiedCredential
    verifiedCredential.credentialSubject[requestDetails.validationType] = requestDetails.requestParams[requestDetails.validationType]
    sendCredSaveIntent({ verifiedCredential });
  }  

  return (
    <>
    {requestDetails &&
    <IonPage className="Details">
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">{requestType === 'outgoing' ? 'Your Request' : 'Incoming Request'}</IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">

          {/* {requestType === 'outgoing' && */}
          <IonRow 
          className={`text-center 
          ${requestDetails.status === "Approved" ? "approved-tooltip" : ""} 
          ${(requestDetails.status === "New" || requestDetails.status === "Cancelation in progress") ? "pending-tooltip" : ""} 
          ${requestDetails.status === "In progress" ? "inprogress-tooltip" : ""} 
          ${requestDetails.status === "Rejected" ? "rejected-tooltip" : ""} 
          ${requestDetails.status === "Expired" ? "expired-tooltip" : ""} 
          ${requestDetails.status === "Canceled" ? "cancelled-tooltip" : ""} 
          `}>
            <IonCol>
              <IonIcon src=
              {`
                ${requestDetails.status === "Approved" ? "/assets/images/icons/icon-check.svg" : ""} 
                ${(requestDetails.status === "New" || requestDetails.status === "Cancelation in progress") ? "/assets/images/icons/icon-wait.svg" : ""}
                ${requestDetails.status === "In progress" ? "/assets/images/icons/icon-in-progress.svg" : ""}
                ${requestDetails.status === "Rejected" ? "/assets/images/icons/icon-rejected.svg" : ""}
                ${requestDetails.status === "Expired" ? "/assets/images/icons/icon-rejected.svg" : ""}
                ${requestDetails.status === "Canceled" ? "/assets/images/icons/icon-rejected.svg" : ""}
              `}
              ></IonIcon>
              <IonLabel>
              {`
                ${requestDetails.status === "Approved" ? "Approved" : ""} 
                ${requestDetails.status === "New" ? "Waiting for Approval" : ""}
                ${requestDetails.status === "In progress" ? "Validation In Progress" : ""}
                ${requestDetails.status === "Rejected" ? "Rejected" : ""}
                ${requestDetails.status === "Expired" ? "Expired" : ""}
                ${requestDetails.status === "Canceled" ? "Cancelled" : ""}
                ${requestDetails.status === "Cancelation in progress" ? "Cancellation In Progress" : ""}
              `}
              </IonLabel>
            </IonCol>
          </IonRow>
          {/* } */}


          <IonRow style={{border: '1px solid #eee', borderRadius: '2%', padding: '10px'}}>
          <h2>Request</h2>
          { requestDetails && requestDetails.validationType &&           
            <IonListHeader className="fieldContainer2">
              <IonCol size="4">
                <IonLabel className="label">Validation Type</IonLabel>
              </IonCol>
              <IonCol size="8" className='ion-text-right'>
                  <IonImg src={`../assets/images/components/icon-${requestDetails.validationType}.svg`} style={{height: '32px', width: '32px', display: 'inline-block', verticalAlign: 'bottom'}}  /> 
                  <IonLabel className="value" style={{verticalAlign: 'super'}}>{requestDetails.validationType.charAt(0).toUpperCase()}{requestDetails.validationType.slice(1)}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.verifiedCredential && requestDetails.verifiedCredential.issuanceDate &&           
            <IonListHeader className="fieldContainer2">
              <IonCol size="4">
                <IonLabel className="label">Issuance Date</IonLabel>
              </IonCol>  
              <IonCol size="8" className="ion-text-right">
                <IonLabel className="value">{formatTime(requestDetails.verifiedCredential.issuanceDate)}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.verifiedCredential && requestDetails.verifiedCredential.expirationDate &&           
            <IonListHeader>
              <IonCol size="4">
                <IonLabel className="label">Expiration Date</IonLabel>
              </IonCol>  
              <IonCol size="8" className="ion-text-right">
                <IonLabel className="value">{formatTime(requestDetails.verifiedCredential.expirationDate)}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            {requestType === 'incoming' && 
            <h2 style={{marginTop: '20px'}}>User Credentials</h2>
            }
            <IonListHeader className="fieldContainer2">
            <IonCol size="3">
              <IonLabel className="label">DID</IonLabel>
            </IonCol>            
            <IonCol size="8" className="userdid ion-text-right">
              <IonTextarea rows={2} cols={12} id="userDID" readonly value={requestDetails && requestDetails.did}>
              </IonTextarea>
            </IonCol>
            <IonCol size="1" style={{margin: 'auto'}}>
              <IonIcon name="copy-outline" src="/assets/images/icons/copy-outline.svg" onClick={(e:any) => copyText("userDID")} />
            </IonCol>           
            </IonListHeader> 
            { requestDetails && requestDetails.requestParams && requestDetails.requestParams[requestDetails.validationType] &&          
            <IonListHeader>
              <IonCol size="3">
                <IonLabel className="label">{requestDetails.validationType.charAt(0).toUpperCase()}{requestDetails.validationType.slice(1)}</IonLabel>
              </IonCol>
              <IonCol size="9" className="ion-text-right">
                <IonLabel className="value">{requestDetails.requestParams[requestDetails.validationType]}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
          </IonRow>

          {requestDetails && provider && provider.did &&     
          <IonRow style={{border: '1px solid #eee', borderRadius: '2%', padding: '10px',
          marginTop: '10px', display: (requestType === 'outgoing' ? 'block' : 'none')}}>
                <h2>Validator</h2>   

              <IonListHeader className="fieldContainer2">
                <IonCol size="4">
                  <IonLabel className="label">Name</IonLabel>
                </IonCol>                
                <IonCol size="8" className="ion-text-right">
                  <img src={provider.logo} style={{height: '32px', width: '32px', display: 'inline-block', verticalAlign: 'bottom', borderRadius: '50%'}} alt="" /> 
                  <IonLabel className="value ion-text-right" style={{paddingLeft: '5px', verticalAlign: 'super'}}>{provider.name}</IonLabel>
                </IonCol>
              </IonListHeader>

              <IonListHeader>
                <IonCol size="3">
                  <IonLabel className="label">DID</IonLabel>
                </IonCol>            
                <IonCol size="8" className="validatordid ion-text-right">
                  <IonTextarea rows={2} cols={12} id="validatorDID" readonly value={provider.did}>
                  </IonTextarea>
                </IonCol>
                <IonCol size="1" style={{margin: 'auto'}}>
                  <IonIcon name="copy-outline" src="/assets/images/icons/copy-outline.svg" onClick={(e:any) => copyText("validatorDID")} />
                </IonCol>           
              </IonListHeader> 
            </IonRow>
          }

            <IonRow style={{border: '1px solid #eee', borderRadius: '2%', padding: '10px',
    marginTop: '10px', display: (requestType === 'outgoing' && requestDetails && (requestDetails.status === 'New' || requestDetails.status === 'In progress') ? 'block' : 'none')}}>
            <h2>Next Steps</h2>

            { requestDetails && (requestDetails.status === 'New' || requestDetails.status === 'In progress') && provider && provider.validation && provider.validation[requestDetails.validationType] && provider.validation[requestDetails.validationType].next_steps && provider.validation[requestDetails.validationType].next_steps.map((step: any, index: number) => 
              <IonListHeader className="fieldContainer">
                  <IonLabel>
                    <span className="label">Step {index + 1}:</span><br/>
                    <span className="value">{step}</span>
                  </IonLabel>
              </IonListHeader>
            )}
          </IonRow>

          { requestType === 'outgoing' && requestDetails && (requestDetails.status === 'New' || requestDetails.status === 'In progress') &&          
          <IonRow className="text-center">
            <IonCol>
              <IonButton className="btnCancelRequest text-center" fill="outline"
              onClick={(e) => handleCancelRequestClick(e)}
              color="danger"
          >Cancel Request</IonButton>
            </IonCol>
          </IonRow>
          }
          { requestType === 'outgoing' && 
          <IonRow className="text-center">
            <IonCol>
              <IonButton className="btnCredentials text-center" 
              onClick={(e) => handleSaveCredClick(e)}
              color={requestDetails.isSavedOnProfile === false && requestDetails.status === "Approved" ? 'success' : 'medium'}
              disabled={requestDetails.isSavedOnProfile === false && requestDetails.status === "Approved" ? false : true}
          >{requestDetails.isSavedOnProfile === true ? 'Saved' : 'Save Credentials'}</IonButton>
            </IonCol>
          </IonRow>
          }

          { requestType === 'incoming' && requestDetails && (requestDetails.status === 'New' || requestDetails.status === 'In progress') &&          
          <IonRow className="text-center" style={{marginTop: '20px'}}>
            <IonCol>
              <IonButton className="btnRejectRequest text-center" fill="outline"
              onClick={(e) => handleRejectRequestClick(e)}
              color="danger"
          >Reject</IonButton>
            </IonCol>
            <IonCol>
              <IonButton className="btnApproveRequest text-center" fill="solid"
              onClick={(e) => handleApproveRequestClick(e)}
              data-validationtype={requestDetails.validationType}
              color="success"
          >Approve</IonButton>
            </IonCol>
          </IonRow>
          }

        </IonGrid>
      </IonContent>
    </IonPage>
    }
    </>
  );
};

export default DetailsPage;