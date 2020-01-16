import { useRef } from "react"
export default function useReferrer (match, location) {
  const ref = useRef({ location: null, referrer: null })
  if (match && ref.current.location !== location) {
    const obj = location.state
    ref.current = {
      location,
      referrer: obj instanceof Object ? `${obj.pathname}${obj.search}${obj.hash}` : null,
    }
  }
  return ref.current.referrer
}