import globals from "lib/utils/globals"
import { useState } from "react"
const storageKey = `lib-react-access_button-use_logout`
const storage = globals.window.localStorage.getItem(storageKey)
const initialAuto = !storage
const bypassDialog = storage === `BYPASS_DIALOG`
export default function useLogout (auth0) {
  const [auto, setAuto] = useState(initialAuto)
  const [isOpen, setIsOpen] = useState(false)
  return {
    open () {
      if (bypassDialog) {
        auth0.logout()
      } else {
        setIsOpen(true)
      }
    },
    isOpen,
    close () {
      setIsOpen(false)
    },
    auto,
    handleAuto () {
      setAuto(!auto)
    },
    confirm () {
      globals.window.localStorage.setItem(storageKey, auto ? `BYPASS_DIALOG` : `OPEN_DIALOG`)
      auth0.logout()
    },
  }
}