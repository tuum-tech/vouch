export function useCredSaved(optionalCallback: any = noop) {

  const credSaved = (confirmation_id: any) => {
    /**
     * Update cred saved to the backend API.
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

      console.log("useCredSaved Hook")
      console.log(confirmation_id)

      postData(`${process.env.REACT_APP_UPDATE_CRED_SAVED}` + confirmation_id.confirmation_id)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback({"data": response.data, "message": "Credentials saved successfully."});                      
          }
        });
  }
  return [credSaved] as [(obj: any) => void]
}

function noop() {}