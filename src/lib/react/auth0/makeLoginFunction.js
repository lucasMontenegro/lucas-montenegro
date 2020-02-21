import loginPopupId from "./loginPopupId"
import languageDetector from "lib/languageDetector"
import globals from "lib/utils/globals"
export default function makeLoginFunction (ready, client, onLoginPopupTimeout, setUser) {
  if (ready) {
    return async function login () {
      const id = loginPopupId.get()
      try {
        await client.loginWithPopup({ ui_locales: languageDetector.get() })
      } catch (e) {
        if (typeof e === `object`) {
          if (e.error === `timeout`) {
            onLoginPopupTimeout && onLoginPopupTimeout()
            globals.console.warn(`An Auth0 login popup timed out.`)
            return
          } else if (e.message === `Invalid state` && loginPopupId.check(id)) {
            globals.console.warn(
              `An Auth0 login popup threw an "Invalid state" error. Probably because the login`
              + ` button was clicked multiple times in a row.`
            )
            return
          }
        }
        throw e
      }
      return await client.isAuthenticated() ? setUser(await client.getUser()) : setUser(null)
    }
  }
  return function login () {}
}