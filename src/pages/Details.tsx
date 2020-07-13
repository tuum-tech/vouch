import React, { useCallback } from 'react';
import { IonContent, IonPage, IonTitle,IonListHeader, IonGrid,IonRow,IonCol,IonLabel,IonToolbar, IonTextarea, IonIcon, IonButton, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import './Details.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { useParams } from 'react-router-dom';
import { useCredSaver } from '../hooks/useCredSaver';
import { useCredSaved } from '../hooks/useCredSaved';
import { showNotification, hideNotification, credSaved } from '../store/requests';

declare let titleBarManager: TitleBarPlugin.TitleBarManager;

const RequestsPage: React.FC = ({ history }: any) => {

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

  let myIconListener = (menuIcon:any) => {
    if (menuIcon.key === "back") {
        goTo('/requests')
    }
  };

  useIonViewWillEnter(() => {    
      titleBarManager.setIcon(1, {
        key: "back",
        iconPath: "back"
      });

      titleBarManager.addOnItemClickedListener(myIconListener);
  });

  useIonViewWillLeave(() => {
    titleBarManager.removeOnItemClickedListener(myIconListener);    
    titleBarManager.setIcon(1, {
      key: '',
      iconPath: ''
    });
  })

  const dispatch = useDispatch()

  const requests = useSelector((state:AppState) => state.requests)
  const validationProviders = useSelector((state:AppState) => state.validationProviders)
  const { id } = useParams()

  const requestDetails = requests.txn.filter((txn: any) => txn.id === id)[0]

  let providerName = '';  
  if(requestDetails.validationType === 'email'){
     providerName = validationProviders.emailValidationProviders.filter((provider:any) => provider.id === requestDetails.provider)[0].name
  }

  const copyText = function (elementId: any){
    let copyText:any = document.querySelector("#" + elementId);
    let inputField = copyText.getElementsByTagName("textarea")[0];
    inputField.select();
    document.execCommand("copy");    
  }

  const [sendCredSaveIntent] = useCredSaver((credentials:any) => { 
      const confirmation_id = requestDetails.id
      sendCredSaved({ confirmation_id });
   })

   const [sendCredSaved] = useCredSaved((response:any) => {
    dispatch(credSaved(response))
    dispatch(showNotification({"message": response.message, "type": "success"}))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)           
   })

  const handleSaveCredClick = (e: any) => {

    let verifiedCredential = requestDetails.verifiedCredential

    //Build request for credimport intent
    // as found at https://developer.elastos.org/build/elastos_scheme/#request-parameters-2        
    verifiedCredential.credentialSubject.email = requestDetails.requestParams.email
    // verifiedCredential.proof.jws = verifiedCredential.proof.signature
    // delete verifiedCredential.proof.signature
    // verifiedCredential.proof.proofPurpose = "assertionMethod"

    // verifiedCredential["@context"] = [
    //   "https://www.w3.org/2018/credentials/v1",
    //   "https://www.w3.org/2018/credentials/examples/v1"
    // ]

    sendCredSaveIntent({ verifiedCredential });
  }  

  return (
    <>
    <IonPage className="Details">
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Request Details</IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">


          <IonRow 
          className={`text-center 
          ${requestDetails.status === "Approved" ? "approved-tooltip" : ""} 
          ${requestDetails.status === "Pending" ? "pending-tooltip" : ""}
          ${requestDetails.status === "Rejected" ? "rejected-tooltip" : ""}
          ${requestDetails.status === "Expired" ? "expired-tooltip" : ""}
          `}>
            <IonCol>
              <IonIcon src=
              {`
                ${requestDetails.status === "Approved" ? "/assets/images/icons/icon-check.svg" : ""} 
                ${requestDetails.status === "Pending" ? "/assets/images/icons/icon-wait.svg" : ""}
                ${requestDetails.status === "Rejected" ? "/assets/images/icons/icon-rejected.svg" : ""}
                ${requestDetails.status === "Expired" ? "/assets/images/icons/icon-expired.svg" : ""}
              `}
              ></IonIcon>
              <IonLabel>
              {`
                ${requestDetails.status === "Approved" ? "Approved" : ""} 
                ${requestDetails.status === "Pending" ? "Waiting for Approval" : ""}
                ${requestDetails.status === "Rejected" ? "Rejected" : ""}
                ${requestDetails.status === "Expired" ? "Expired" : ""}
              `}
              </IonLabel>
            </IonCol>
          </IonRow>


          <IonRow>
            { requestDetails && requestDetails.id &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Request ID</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonLabel className="value">{requestDetails.id}</IonLabel>
              </IonCol>
            </IonListHeader>
            }            
            { requestDetails && requestDetails.validationType &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Validation Service</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonLabel className="value">{requestDetails.validationType.charAt(0).toUpperCase()}{requestDetails.validationType.slice(1)} Validation</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.providerId &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Validator</IonLabel>
              </IonCol>                
              <IonCol size="8">
                <IonLabel className="value">{providerName}</IonLabel>
              </IonCol>                
            </IonListHeader>
            }
            { requestDetails && requestDetails.lastUpdate &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Last Updated</IonLabel>
              </IonCol>  
              <IonCol size="8">
                <IonLabel className="value">{requestDetails.lastUpdate}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            </IonRow>

            <IonRow>
            <IonListHeader className="fieldContainer fieldContainer2">
            <IonCol size="3">
              <IonLabel className="label">DID</IonLabel>
            </IonCol>            
            <IonCol size="8" className="userdid">
              <IonTextarea rows={2} cols={12} id="userDID" readonly value={requestDetails && requestDetails.did}>
              </IonTextarea>
            </IonCol>
            <IonCol size="1" style={{margin: 'auto'}}>
              <IonIcon name="copy-outline" src="/assets/images/icons/copy-outline.svg" onClick={(e:any) => copyText("userDID")} />
            </IonCol>           
            </IonListHeader> 
            { requestDetails && requestDetails.requestParams.name &&          
            <IonListHeader className="fieldContainer">
              <IonCol size="3">
                <IonLabel className="label">Name</IonLabel>
              </IonCol>
              <IonCol size="9">
                <IonLabel className="value">{requestDetails.requestParams.name}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.requestParams.email &&          
            <IonListHeader className="fieldContainer">
              <IonCol size="3">
                <IonLabel className="label">Email</IonLabel>
              </IonCol>
              <IonCol size="9">
                <IonLabel className="value">{requestDetails.requestParams.email}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.requestParams.telephone &&          
            <IonListHeader className="fieldContainer">
              <IonCol size="3">
                <IonLabel className="label">Mobile Phone</IonLabel>
              </IonCol>
              <IonCol size="9">
                <IonLabel className="value">{requestDetails.requestParams.telephone}</IonLabel>
              </IonCol>
            </IonListHeader>
            }                        
          </IonRow>
          <IonRow className="text-center">
            <IonCol>
              <IonButton className="btnCredentials text-center" 
              onClick={(e) => handleSaveCredClick(e)}
              color={requestDetails.isSavedOnProfile === false && requestDetails.status === "Approved" ? 'success' : 'medium'}
              disabled={requestDetails.isSavedOnProfile === false && requestDetails.status === "Approved" ? false : true}
          >{requestDetails.isSavedOnProfile === true ? 'Saved' : 'Save Credentials'}</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
    </>
  );
};

export default RequestsPage;