import useTranslation from "lib/react/useTranslation"
import React, { useState, useCallback } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
function LoginTimeoutAlert (props) {
  const t = useTranslation()
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={60000}
      onClose={props.close}
      anchorOrigin={{ vertical: `bottom`, horizontal: `left` }}
    >
      <Alert onClose={props.close} severity="warning" variant="filled">
        {t({
          en: () => `It took you too long to log in. You may need to try again.`,
          es: () => `Tardaste mucho en iniciar sesión. Tal vez tengas que intentarlo de nuevo.`,
        })}
      </Alert>
    </Snackbar>
  )
}
export default function useLoginTimeoutAlert () {
  const [isOpen, setIsOpen] = useState(false)
  function close (e, reason) {
    if (reason === `clickaway`) {
      return
    }
    setIsOpen(false)
  }
  return {
    open: useCallback(() => setIsOpen(true), []),
    node: <LoginTimeoutAlert isOpen={isOpen} close={close} />
  }
}