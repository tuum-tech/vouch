export function useApproveRequest(optionalCallback: any = noop) {

  const requestApproved = (data: any) => {
    /**
     * Approve the New/In progress manual validation request via backend API.
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

      postData(`${process.env.REACT_APP_APPROVE_REQUEST}` + data.confirmationId, data.verifiedCredential)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback({"data": response.data, "message": "Approval initiated successfully."});                      
          }
        });
  }
  return [requestApproved] as [(obj: any) => void]
}

function noop() {}