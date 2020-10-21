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
    { val: 'email', isChecked: false },
    { val: 'name', isChecked: false },
    { val: 'phone', isChecked: false },
    { val: 'gender', isChecked: false },
    { val: 'location', isChecked: false },
    { val: 'birthdate', isChecked: false },
    { val: 'birthplace', isChecked: false },
    { val: 'education', isChecked: false },
    { val: 'occupation', isChecked: false },
    { val: 'wechat', isChecked: false },
    { val: 'instagram', isChecked: false },
    { val: 'facebook', isChecked: false },
    { val: 'snapshot', isChecked: false },
    { val: 'twitter', isChecked: false },
    { val: 'telegram', isChecked: false },
    { val: 'paypal', isChecked: false },
    { val: 'ela', isChecked: false }  
])

const updateItem = (val: string, newIsChecked: boolean) => {
  var index = checkedItems.findIndex(x => x.val === val);

  let g:any = checkedItems[index]
  g['isChecked'] = newIsChecked
  if (index === -1){
    // handle error
    console.log('no match')
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
        console.log(providerServices)
        console.log("Calling the API to get provider services")    
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
      console.log(services)
      dispatch(getProviderServices(services))

      populateRegisteredServices(services)
    }
  })   

  const populateRegisteredServices = (services:any) => {
    if(services && services.validationTypes){
      // TODO:
      console.log("found provider services to filter")
      console.log(services)
      services.validationTypes.forEach(function(service:any) {
        console.log(service)
        updateItem(service, true);
      })
  
      console.log("after transformation")
      console.log(checkedItems)
    }    
  }



  let services:object = {}

  const handleSubmitRequestClick = (e: any) => {
    console.log("Submit request");
    console.log(checkedItems);

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
        // console.log("assigned service")
        // console.log(services)
      }
    }

    console.log("Dynamic services")
    console.log(services)

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

    signIn({ name: true, email: true, avatar: true })
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

      console.log("Q hogaya na? register...")
      console.log(provider)

      dispatch(setProviderServices(provider, () => goTo('/home')))
      dispatch(showNotification({"message": provider.message, "type": "success", "show": true}))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)      
    } 
    else {
      console.log("Na bha na? tumse na hopayega...")

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
