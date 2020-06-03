export function useRequests(optionalCallback: any = noop) {

  const allRequests = (userinfo: any) => {
    /**
     * Request to get all the requests for this user to the backend API.
     */

      async function getData(url = '') {

        console.log("URL" + url)
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
      }

      if(userinfo){
        getData('http://192.168.0.104:8080/get?didid=' + userinfo.id)
        .then(data => {
          // console.log("API response");
          // console.log(data); // JSON data parsed by `response.json()` call
          //return data;
          optionalCallback(data);          
        });
      }

  }
  return [allRequests] as [(obj: any) => void]
}

function noop() {}