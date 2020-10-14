export function useProvider(optionalCallback: any = noop) {

  const providers = (validationType: any) => {
    /**
     * Request to get all providers for a validation type e.g. email
     */

      async function getData(url = '') {

        const response = await fetch(url + validationType, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Authorization': `${process.env.REACT_APP_BACKEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        });

        return response.json();
      }

      // if(validationType === 'email' || validationType === 'phone' || validationType === 'name'){
        getData(`${process.env.REACT_APP_GET_PROVIDERS_BY_VALIDATION_TYPE}`)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback(response.data);          
          }

        });
      // }

  }
  return [providers] as [(obj:any) => void]
}

function noop() {}