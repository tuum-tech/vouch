export function useEmailValidation(optionalCallback: any = noop) {

  const emailValidationRequest = (userinfo: any) => {
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
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
      }

      const txn = {
        "validationType": "email",
        "providerId": "eyvc79BEYdycHYQFhqCKXKsdzqt",
        "params": {
          "didId": userinfo.user.id,
          "email": userinfo.user.email
        }
      }

      postData('http://192.168.0.104:8080/start', txn)
        .then(data => {
          // console.log("API response");
          // console.log(data); // JSON data parsed by `response.json()` call
          //return data;
          optionalCallback(data);          
        });
  }
  return [emailValidationRequest] as [(obj: any) => void]
}

function noop() {}