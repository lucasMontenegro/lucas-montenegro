import { useRef } from "react"
import globals from "lib/utils/globals"
const namespace = {}
export default function useDiv (name) {
  const div = useRef(null)
  if (name === null) {
    return null
  } else if (div.current === null) {
    div.current = namespace[name] || (namespace[name] = globals.document.createElement(`div`))
  }
  return div.current
}