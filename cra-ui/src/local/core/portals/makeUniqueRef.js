import { useRef, useEffect } from "react"
export default function makeUniqueRef (name, production) {
  typeof production === `undefined` && (production = process.env.NODE_ENV === `production`)
  let count = 0
  return function useUniqueRef () {
    const firstRender = useRef(true)
    const shouldRender = useRef(true)
    useEffect(() => () => count--, [])
    if (firstRender.current) {
      firstRender.current = false
      count++
      if (count !== 1) {
        shouldRender.current = false
        if (!production) {
          throw Error(`${name}: Only one instance is allowed`)
        }
      }
    }
    return shouldRender.current
  }
}