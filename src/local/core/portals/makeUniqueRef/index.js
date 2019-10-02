import { useRef, useEffect } from "react"
export default function makeUniqueRef (name, mode) {
  const allowExceptions = `production` !== (mode || process.env.NODE_ENV)
  let count = 0
  return function useUniqueRef () {
    const shouldRender = useRef(null)
    useEffect(() => () => {
      count--
    }, [])
    if (shouldRender.current === null) {
      count++
      if (count !== 1) {
        shouldRender.current = false
        if (allowExceptions) {
          throw Error(`${name}: Only one instance is allowed`)
        }
      } else {
        shouldRender.current = true
      }
    }
    return shouldRender.current
  }
}