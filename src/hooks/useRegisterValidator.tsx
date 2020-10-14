export function useRegisterValidator(optionalCallback: any = noop) {

  const registerValidatorRequest = (data: any) => {
    /**
     * Request registering as a validator to the backend API.
     */

      async function postData(url = '', data = {}) {

        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `${process.env.REACT_APP_BACKEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
      }

      console.log("data in useRegisterValidator hook")
      console.log(data)

      // const did = data.user.id.split(':').pop();      
      const provider = {
        "did": data.user.id,        
        "name": data.user.name,
        "logo": data.user.avatar,
        "validation": data.services
      }
      console.log("HOOK having data")
      console.log(provider)

      postData(`${process.env.REACT_APP_REGISTER_VALIDATOR}`, provider)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback({"data": response.data, "message": "Successfully registered as a validator for the selected services."});          
          } else {
            optionalCallback({"data": null, "message": "Oops! something went wrong. Could not register as a validator."});          
          }
        });
  }
  return [registerValidatorRequest] as [(obj: any) => void]
}

function noop() {}