export function useCancelRequest(optionalCallback: any = noop) {

  const requestCancelled = (confirmation_id: any) => {
    /**
     * Cancel the New/In progress request via backend API.
     */

      async function postData(url = '', data = {}) {

        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Authorization': `${process.env.REACT_APP_BACKEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });

        return response.json();
      }

      postData(`${process.env.REACT_APP_CANCEL_REQUEST}` + confirmation_id.confirmation_id)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback({"data": response.data, "message": "Cancellation initiated successfully."});                      
          }
        });
  }
  return [requestCancelled] as [(obj: any) => void]
}

function noop() {}