declare let appManager: AppManagerPlugin.AppManager;
declare let didManager: DIDPlugin.DIDManager;

export function useDID(optionalCallback: any = noop) {
  const signIn = (claims: any) => {
    /**
     * Request some credentials to the DID application.
     */
    appManager.sendIntent("credaccess", { claims }, {}, (response: any) => {

      if (response && response.result && response.result.presentation) {

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