declare let appManager: AppManagerPlugin.AppManager;
declare let didManager: DIDPlugin.DIDManager;

export function useDID(optionalCallback: any = noop) {
  const signIn = (claims: any) => {
    /**
     * Request some credentials to the DID application.
     */
    appManager.sendIntent("credaccess", { claims }, {}, (response: any) => {
      console.log("Credential access response received", response)

      if (response && response.result && response.result.presentation) {
        console.log("Received a presentation, so we are now signed in.", response.result);

        // Create a real presentation object from json data
        didManager.VerifiablePresentationBuilder.fromJson(JSON.stringify(response.result.presentation), (presentation)=>{
          const credentials = presentation.getCredentials();
          optionalCallback(credentials)
        });
      }
    })
  }
  return [signIn] as [(obj: any) => void]
}

function noop() {}