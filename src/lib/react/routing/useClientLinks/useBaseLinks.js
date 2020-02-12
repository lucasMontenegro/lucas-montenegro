import { useRef } from "react"
export default function useClientLinks (render) {
  const ref = useRef(null)
  let refValue = ref.current
  if (refValue === null) {
    refValue = ref.current = Object.keys(render).reduce((arr, clientName) => {
      arr.push({ render: render[clientName], clientName })
      return arr
    }, [])
  }
  return refValue
}