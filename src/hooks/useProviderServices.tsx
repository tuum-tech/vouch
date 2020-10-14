export function useProviderServices(optionalCallback: any = noop) {

  const services = (did: any) => {
    /**
     * Request to get all services of a provider by its did
     */

    async function getData(url = '') {
      const response = await fetch(url + did, {
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

    getData(`${process.env.REACT_APP_GET_PROVIDER_SERVICES_BY_DID}`)
    .then(response => {
      if(response.meta.code === 200) {
        optionalCallback(response.data);          
      }

    });
  }
  return [services] as [(obj:any) => void]
}

function noop() {}