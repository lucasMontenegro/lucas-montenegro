import { useRef, useEffect } from "react"
import isProduction from "lib/utils/isProduction"
const namespace = {}
export default function useUniqueInstance (getName) {
  const unique = useRef(false)
  const name = useRef(null)
  if (name.current === null) {
    name.current = getName()
  }
  const nameStr = name.current
  if (!unique.current && !(nameStr in namespace)) {
    namespace[nameStr] = null
    unique.current = true
  }
  const uniqueBool = unique.current
  useEffect(() => () => {
    if (uniqueBool) {
      delete namespace[nameStr]
    }
  }, [uniqueBool, nameStr])
  if (uniqueBool || isProduction()) return uniqueBool
  throw Error(`${nameStr}: Only one instance is allowed`)
}