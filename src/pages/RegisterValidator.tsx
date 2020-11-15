import React, { useCallback, useState, useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonToolbar, IonPage, IonTitle, IonContent, IonCheckbox, IonList, IonItem, IonLabel, IonButton, useIonViewWillEnter } from '@ionic/react';
import './Profile.css';
import './Support.css';
import { useProviderServices } from '../hooks/useProviderServices';
import { AppState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { getProviderServices, setProviderServices } from '../store/providers';
import { useRegisterValidator } from '../hooks/useRegisterValidator';
import { showNotification, hideNotification } from '../store/requests';
import { useDID } from '../hooks/useDID';
import { login } from '../store/auth';

declare let titleBarManager: TitleBarPlugin.TitleBarManager;

const RegisterValidatorPage: React.FC = ({ history }: any) => {

  const[checkedItems,setCheckedItems]= useState([
    { val: 'email', type: 'BasicProfileCredential', isChecked: false },
    { val: 'name', type: 'BasicProfileCredential', isChecked: false },
    { val: 'telephone', type: 'BasicProfileCredential', isChecked: false },
    { val: 'gender', type: 'BasicProfileCredential', isChecked: false },
    { val: 'location', type: 'BasicProfileCredential', isChecked: false },
    { val: 'birthdate', type: 'BasicProfileCredential', isChecked: false },
    { val: 'birthplace', type: 'BasicProfileCredential', isChecked: false },
    { val: 'education', type: 'BasicProfileCredential', isChecked: false },
    { val: 'occupation', type: 'BasicProfileCredential', isChecked: false },
    { val: 'wechat', type: 'InternetAccountCredential', isChecked: false },
    { val: 'instagram', type: 'InternetAccountCredential', isChecked: false },
    { val: 'facebook', type: 'InternetAccountCredential', isChecked: false },
    { val: 'snapshot', type: 'InternetAccountCredential', isChecked: false },
    { val: 'twitter', type: 'InternetAccountCredential', isChecked: false },
    { val: 'telegram', type: 'InternetAccountCredential', isChecked: false },
    { val: 'paypal', type: 'InternetAccountCredential', isChecked: false },
    { val: 'ela', type: 'InternetAccountCredential', isChecked: false }  
])

const updateItem = (val: string, newIsChecked: boolean) => {
  var index = checkedItems.findIndex(x => x.val === val);

  let g:any = checkedItems[index]
  g['isChecked'] = newIsChecked
  if (index === -1){
    // handle error 
  }
  else {
    setCheckedItems([
      ...checkedItems.slice(0,index),
      g,
      ...checkedItems.slice(index+1)
    ]);
  }
}

  const dispatch = useDispatch()  
  const providerServices = useSelector((state:AppState) => state.validationProviders.providerServices)
  const user = useSelector((state:AppState) => state.auth.user)  



  const goTo = useCallback(
    (path: string) => {
      history.push(path, { direction: 'forward' });
    },
    [history],
  );

  let myIconListener = (menuIcon:any) => {
    if (menuIcon.key === "back") {
        goTo('/home')
    }
  };  

  useEffect(() => {
      if(!providerServices){
        sendGetProviderServices(user.id)
      } else {
        populateRegisteredServices(providerServices)
      }
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
   []
 );

  useIonViewWillEnter(() => {
    titleBarManager.setIcon(1, {
      key: "back",
      iconPath: "back"
    });

    titleBarManager.addOnItemClickedListener(myIconListener);
  });

  const [sendGetProviderServices] = useProviderServices((services:any) => { 
    if(services) {
      dispatch(getProviderServices(services))

      populateRegisteredServices(services)
    }
  })   

  const populateRegisteredServices = (services:any) => {
    if(services && services.validationTypes){
      services.validationTypes.forEach(function(service:any) {
        updateItem(service, true);
      })
    }    
  }



  let services:object = {}

  const handleSubmitRequestClick = (e: any) => {

    const tempServices = checkedItems.map(function(s){
      if(s.isChecked){
        return {[s.val]: {"manual": true, "next_steps": []}}
      }
      return {}
    })

    for(let i=0;i<tempServices.length;i++){
      //Check if the service object is not empty
      if(!(Object.keys(tempServices[i]).length === 0 && [tempServices[i]].constructor === Object)){
        Object.assign(services, tempServices[i])
      }
    }

    /* Sample request data
    services = {
      "email": {
          "manual": true,
          "next_steps": []
      },
      "name": {
          "manual": true,
      }
    }*/

    signIn({ name: true, avatar: true })
  }

  const [signIn] = useDID((credentials:any) => { 
    if(credentials.length) {
      const credSubjects = credentials.map((cred:any) => cred.credentialSubject)
      const user = Object.assign({}, ...credSubjects)
      dispatch(login(user, () => sendRegisterValidatorRequest({ user: user, services: services })))    
    }
   })

  const [sendRegisterValidatorRequest] = useRegisterValidator((provider:any) => { 
    if(provider) {
      dispatch(setProviderServices(provider, () => goTo('/home')))
      dispatch(showNotification({"message": provider.message, "type": "success", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)      
    } 
    else {
      history.push('/home');
      dispatch(showNotification({"message": provider.message, "type": "warning", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000) 
    }
   })

  return (
    <IonPage className="Profile Support">
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Register as a Validator</IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">
          <IonRow>
            <IonCol size="12">
              <h2 style={{margin: 0}}>Services</h2>

              {/*-- Checkboxes in a List --*/}
              <IonList>
                { checkedItems.map(({val, isChecked}) => (
                  <IonItem key={val} 
                  // disabled={(providerServices && providerServices.validationTypes.includes(val)) ?? isChecked}
                  >
                    <IonCheckbox slot="end" value={val} checked={isChecked} onIonChange={e => updateItem(val, e.detail.checked)} />
                    <IonLabel>{val}</IonLabel>
                  </IonItem>
                )) }
              </IonList>
              </IonCol>
          </IonRow>
          <IonRow className="text-center">
            <IonCol>
              <IonButton color="success" fill="solid" className="text-center" onClick={(e) => handleSubmitRequestClick(e)}>Submit Request</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(RegisterValidatorPage);
