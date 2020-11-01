declare let appManager: AppManagerPlugin.AppManager;

export function useCredIssue(optionalCallback: any = noop) {
  const credIss = (credentials: Object) => {
    /**
     * Request credential issuing.
     */

     console.log("From cred issue")
     console.log(credentials)
    //  credentials = Object.values(credentials)

    appManager.sendIntent("credissue", credentials, {}, (response: any) => {

      if (response && response.result) {
          console.log("Cred Issue result")
          console.log(response.result)

          optionalCallback(JSON.parse(response.result.credential))
      }
    })
  }
  return [credIss] as [(obj: any) => void]
}

function noop() {}