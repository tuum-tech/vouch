export function useRejectRequest(optionalCallback: any = noop) {

  const requestRejected = (confirmation_id: any) => {
    /**
     * Reject the New/In progress manual validation request via backend API.
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

      postData(`${process.env.REACT_APP_REJECT_REQUEST}` + confirmation_id.confirmation_id)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback({"data": response.data, "message": "Rejection initiated successfully."});                      
          }
        });
  }
  return [requestRejected] as [(obj: any) => void]
}

function noop() {}