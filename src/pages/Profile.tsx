import React, { useCallback } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonListHeader, IonLabel, IonHeader, IonToolbar, IonImg, IonPage, IonTitle, IonContent, IonTextarea, IonIcon } from '@ionic/react';
import './Profile.css';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/auth'
import { AppState } from '../store'

declare global{
  interface Window {
      cordova : any
  }
}

const ProfilePage: React.FC = ({ history }: any) => {

  const dispatch = useDispatch()
  
  const user = useSelector((state:AppState) => state.auth.user)

  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

  const copyText = function (elementId: any){
    let copyText:any = document.querySelector("#" + elementId);
    let inputField = copyText.getElementsByTagName("textarea")[0];
    inputField.select();
    document.execCommand("copy");    
  }

  return (
    <>
    <IonPage className="Profile">
      <IonHeader className="main-header">
        <IonToolbar>
          <IonImg className="Navbar-Logo" src="/assets/images/ui components/empty.png"></IonImg>
        </IonToolbar>
      </IonHeader>
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
              <IonButton className="signOut text-center" color="light" onClick={() => { dispatch(logout(() => goTo('/signin'))) }}>
                <IonImg className="sign-out-button" src="/assets/images/ui components/icon-Sign-out.svg" ></IonImg> Sign Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
    </>
  );
};

export default ProfilePage;
