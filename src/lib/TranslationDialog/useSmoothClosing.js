import { useRef } from "react"
// avoid language changes while closing the dialog
export default function useSmoothClosing (isOpen, children) {
  const wasOpen = useRef(false)
  const savedChildren = useRef(null)
  const result = (!isOpen && wasOpen.current) ? savedChildren.current : children
  wasOpen.current = isOpen
  savedChildren.current = children
  return result
}