import React, { useCallback } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonListHeader, IonLabel, IonToolbar, IonImg, IonPage, IonTitle, IonContent, IonTextarea, IonIcon } from '@ionic/react';
import './Profile.css';

import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../store'
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';
import { showNotification, hideNotification } from '../store/requests';

declare global{
  interface Window {
      cordova : any
  }
}

const ProfilePage: React.FC = () => {

  const dispatch = useDispatch()

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
      const user = Object.assign({}, ...credSubjects)
      dispatch(login(user, () => '/profile'))
    }
   })
  
  const user = useSelector((state:AppState) => state.auth.user)

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

  return (
    <IonPage className="Profile">
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">My Account</IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">
          <IonRow>
            <IonCol>
              <h2>Your DID</h2>
            </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="11" className="userdid">
                <IonTextarea rows={2} cols={20} id="userDID" readonly value={user && user.id}>
                </IonTextarea>
              </IonCol>
                <IonCol size="1" style={{margin: 'auto'}}>
                  <IonIcon name="copy-outline" src="/assets/images/icons/copy-outline.svg" onClick={(e:any) => copyText("userDID")} />
              </IonCol>              
            </IonRow>


          <IonRow>

          { user && user.name &&          
          <IonListHeader className="fieldContainer">
            <IonLabel className="label"><IonIcon className="vertical-top" name="person-outline" src="/assets/images/icons/person-outline.svg"></IonIcon><span className="icon-divider">Name</span></IonLabel>
            <IonLabel className="value">{user.name}</IonLabel>
          </IonListHeader>
          }

          { user && user.email &&          
          <IonListHeader className="fieldContainer">
            <IonLabel className="label"><IonIcon className="vertical-top" name="mail-outline" src="/assets/images/icons/mail-outline.svg"></IonIcon><span className="icon-divider">Email</span></IonLabel>
            <IonLabel className="value">{user.email}</IonLabel>
          </IonListHeader>
          }

          { user && user.telephone &&                    
          <IonListHeader className="fieldContainer">
            <IonLabel className="label"><IonIcon className="vertical-top" name="phone-portrait-outline" src="/assets/images/icons/phone-portrait-outline.svg"></IonIcon><span className="icon-divider">Mobile Phone</span></IonLabel>
            <IonLabel className="value">{user.telephone}</IonLabel>
          </IonListHeader>
          }

          </IonRow>
          <IonRow className="text-center">
            <IonCol>
              <IonButton className="signOut text-center" color="light" onClick={() => signIn({ name: false, email: false, telephone: false })}>              
                <IonImg className="sign-out-button" src="../assets/images/components/icon-sign-out.svg" ></IonImg> Refresh Credentials
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default React.memo(ProfilePage);
