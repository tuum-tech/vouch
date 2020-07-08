declare let appManager: AppManagerPlugin.AppManager;

export function useCredSaver(optionalCallback: any = noop) {
  const credSave = (credentials: any) => {
    /**
     * Request credential saving to the DID application.
     */

    credentials = [credentials.verifiedCredential]

    appManager.sendIntent("credimport", { credentials }, {}, (response: any) => {

      if (response && response.result) {
        optionalCallback(credentials)
      }
    })
  }
  return [credSave] as [(obj: any) => void]
}

function noop() {}