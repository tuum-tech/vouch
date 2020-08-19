export function useRequest(optionalCallback: any = noop) {

  const request = (confirmation_id: any) => {
    /**
     * Request to get the status by confirmation id from the backend API.
     */

      async function getData(url = '') {

        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
          // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
      }

      getData(`${process.env.REACT_APP_GET_VALIDATION_REQUEST}` + confirmation_id.confirmation_id)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback({"data": response.data[0]});                      
          }
        });
  }
  return [request] as [(obj: any) => void]
}

function noop() {}