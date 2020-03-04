import { useRef } from "react"
export default function useContact () {
  const ref = useRef(null)
  return {
    ref,
    handleClick () {
      ref.current.scrollIntoView()
    },
  }
}