import { useLayoutEffect, useState } from "react"
import i18next from "i18next"
export default function useReadyState () {
  const [ready, setReady] = useState(false)
  useLayoutEffect(() => {
    if (i18next.isInitialized) {
      setReady(true)
    } else {
      function handleInit () {
        setReady(true)
      }
      i18next.on(`initialized`, handleInit)
      return () => i18next.off(`initialized`, handleInit)
    }
  }, [])
  return ready
}