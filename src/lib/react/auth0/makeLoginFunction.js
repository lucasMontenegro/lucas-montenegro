import loginPopupId from "./loginPopupId"
import languageDetector from "lib/languageDetector"
import globals from "lib/utils/globals"
import createUser from "./createUser"
export default function makeLoginFunction (client, openLta, setUser) {
  if (client === null) {
    return function login () {}
  }
  return async function login () {
    const id = loginPopupId.get()
    try {
      await client.loginWithPopup({ ui_locales: languageDetector.get() })
    } catch (e) {
      if (typeof e === `object`) {
        if (e.error === `timeout`) {
          openLta()
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
    return setUser(await createUser(client))
  }
}