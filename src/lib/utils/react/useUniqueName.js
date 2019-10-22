import { useRef } from "react"
export default function useUniqueName (namespace, name) {
  const ref = useRef(null)
  let check = false
  if (ref.current === null) {
    ref.current = {}
    check = true
  } else if (ref.current.name !== name) {
    if (!ref.current.repeated) {
      delete namespace[ref.current.name]
    }
    check = true
  }
  if (check) {
    ref.current.name = name
    const repeated = ref.current.repeated = name in namespace
    if (!repeated) {
      namespace[name] = null
    }
  }
  return ref.current.repeated ? null : name
}