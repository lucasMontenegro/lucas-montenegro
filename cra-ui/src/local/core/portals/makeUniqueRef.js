import { useRef, useEffect } from "react"
export default function makeUniqueRef (name, mode) {
  const allowExceptions = `production` !== (mode || process.env.NODE_ENV)
  let count = 0
  return function useUniqueRef () {
    const firstRender = useRef(true)
    const shouldRender = useRef(true)
    useEffect(() => () => {
      count--
    }, [])
    if (firstRender.current) {
      firstRender.current = false
      count++
      if (count !== 1) {
        shouldRender.current = false
        if (allowExceptions) {
          throw Error(`${name}: Only one instance is allowed`)
        }
      }
    }
    return shouldRender.current
  }
}