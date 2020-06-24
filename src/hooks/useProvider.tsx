export function useProvider(optionalCallback: any = noop) {

  const providers = (validationType: any) => {
    /**
     * Request to get all providers for a validation type e.g. email
     */

      async function getData(url = '') {

        console.log("URL" + url)
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        });

        return response.json();
      }

      if(validationType === 'email' || validationType === 'phone' || validationType === 'name'){
        getData(`${process.env.REACT_APP_GET_PROVIDERS_BY_VALIDATION_TYPE}` + validationType)
        .then(data => {
          optionalCallback(data);          
        });
      }

  }
  return [providers] as [(obj:any) => void]
}

function noop() {}