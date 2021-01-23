import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonTitle,IonListHeader, IonGrid,IonRow,IonCol,IonLabel,IonToolbar, IonTextarea, IonIcon, IonButton, IonImg } from '@ionic/react';
import './Details.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { useParams } from 'react-router-dom';
import { showNotification, hideNotification, requestCancelled } from '../store/requests';
import moment from 'moment'
import { useCancelRequest } from '../hooks/useCancelRequest';
import { ValidationProviderState } from '../store/providers';
import { Storage } from '@capacitor/core';

declare let appManager: AppManagerPlugin.AppManager;

const IntentDetailsPage: React.FC = () => {

  const dispatch = useDispatch()
  const requests = useSelector((state:AppState) => state.requests)
  const { id } = useParams()
  const [counter, setCounter] = useState(20);
  const [showCounter, setShowCounter] = useState('');

  //Check in all outgoing transactions
  let requestDetails = requests.txn.filter((txn: any) => txn.id === id)

  if(requestDetails){
    requestDetails = requestDetails[0]
  }
    
  let provider:any = {
    'did': '',
    'name': '', 
    'logo': '', 
    'validation': {}
  };

  provider.validation[requestDetails.validationType] = {
    'next_steps': []
  }

  useEffect(() => {
      const timer =
        setInterval(async () => {
          setCounter(counter-1)
      
          if (counter < 10) {
            setShowCounter("0"+counter.toString());
          } else {
            setShowCounter(counter.toString());      
          }

          if(counter <= 0){
            closeIntent();
          }
      }, 1000);
      return () => clearInterval(timer);
  }, [counter]);

  const closeIntent = async function() {
    const intentData = await Storage.get({ key: 'intentData' })
    if(intentData && intentData.value){
      const parsedIntentData = JSON.parse(intentData.value)

      appManager.sendIntentResponse(
        parsedIntentData.action,
        {},
        parsedIntentData.intentId,
        success => {
          Storage.remove({ 
            key: 'intentData'
            }) 
            appManager.close()
        },
        error =>{
          console.error(error)
        }
      )

      console.log("intent response sent")
    } else {
      console.log("closing without intent response")
      Storage.remove({ 
        key: 'intentData'
      }) 
      appManager.close()
    }
  }

  const validationProviders:ValidationProviderState = useSelector((state:AppState) => state.validationProviders)

  if(validationProviders[requestDetails.validationType + "ValidationProviders"]){    
    provider = validationProviders[requestDetails.validationType + "ValidationProviders"].filter((provider:any) => provider.id === requestDetails.provider)[0]
  }

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

   const handleCancelRequestClick = (e:any) => {
    const confirmation_id = requestDetails.id
    sendCancelRequest({ confirmation_id });
   }

   const [sendCancelRequest] = useCancelRequest((response:any) => {
    dispatch(requestCancelled(response))
    dispatch(showNotification({"message": response.message, "type": "success", "show": true}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)           
   })

  return (
    <IonPage className="Details">
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Your Request <IonButton className="text-center" 
                      onClick={(e) => closeIntent() }
                      style={{'paddingTop': '12px', 'marginLeft': '60px', 'marginTop': '5px'}}
                      size="small" color="tertiary" fill="solid"
                  >Close ({showCounter} sec)</IonButton></IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">


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
    marginTop: '10px'}}>
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
    marginTop: '10px'}}>
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
          { requestDetails && (requestDetails.status === 'New' || requestDetails.status === 'In progress') &&          
          <IonRow className="text-center">
            <IonCol>
              <IonButton className="btnCancelRequest text-center" fill="outline"
              onClick={(e) => handleCancelRequestClick(e)}
              color="danger"
          >Cancel Request</IonButton>
            </IonCol>
          </IonRow>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default IntentDetailsPage;