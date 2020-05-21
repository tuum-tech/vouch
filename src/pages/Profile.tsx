import React, { useCallback } from 'react';
import { IonButton, IonItem, IonList, IonGrid, IonRow, IonCol, IonListHeader, IonLabel, IonHeader, IonToolbar, IonImg, IonPage, IonTitle, IonContent } from '@ionic/react';
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

  return (
    <>
    <IonPage>
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
              <IonListHeader>
                <div><h2>Your DID <br /><br /> 
                {/* <strong>iajQJHQXUaABC56SHDGhsg28</strong> */}
                {user && user.id}
                </h2></div>
             </IonListHeader>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonList>
          
          
          </IonList>
            {user && user.name &&          
              <IonCol size="12">Name 
                <IonItem>
                  <IonLabel>{user.name}</IonLabel> 
                </IonItem>
              </IonCol>
            }
            {user && user.email &&          
              <IonCol size="12">Email 
                <IonItem>
                  <IonLabel>{user.email}</IonLabel>
                </IonItem>
              </IonCol>
            }
            {user && user.telephone &&          
              <IonCol size="12">Phone 
                <IonItem>
                  <IonLabel>{user.telephone}</IonLabel>              
                </IonItem>
              </IonCol>
            }
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton className="signOut text-center" color="light" onClick={() => { dispatch(logout(() => goTo('/signin'))) }}>
                <IonImg className="sign-out-button" src="/assets/images/ui components/icon-Sign-out.svg" ></IonImg> Sign Out
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid></IonGrid>
      </IonContent>
    </IonPage>
    </>
  );
};

export default ProfilePage;
