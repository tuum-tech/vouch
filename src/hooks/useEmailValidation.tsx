export function useEmailValidation(optionalCallback: any = noop) {

  const emailValidationRequest = (data: any) => {
    /**
     * Request email validation to the backend API.
     */

      async function postData(url = '', data = {}) {

        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Authorization': `${process.env.BACKEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
      }

      // const did = data.user.id.split(':').pop();      
      const txn = {
        "did": data.user.id,        
        "validationType": "email",
        "provider": data.providerId,
        "requestParams": {
          "email": data.user.email
        }
      }

console.log("Sending email validation request")
console.log(txn)

      postData(`${process.env.REACT_APP_SUBMIT_VALIDATION_REQUEST}`, txn)
        .then(response => {
          // console.log("API response");
          // console.log(data); // JSON data parsed by `response.json()` call
          //return data;
          console.log("Reseponse")
          console.log(response)
          if(response.meta.code === 200){
            optionalCallback(response.data);          
          }
        });
  }
  return [emailValidationRequest] as [(obj: any) => void]
}

function noop() {}