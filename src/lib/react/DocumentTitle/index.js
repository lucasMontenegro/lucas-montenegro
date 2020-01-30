import { useRef, useEffect } from "react"
import globals from "lib/utils/globals"
export default function DocumentTitle ({ value }) {
  const ref = useRef(null)
  if (ref.current === null) {
    ref.current = { value: globals.document.title }
  }
  useEffect(() => {
    globals.document.title = value
    return () => {
      globals.document.title = ref.current.value
    }
  }, [value])
  return null
}