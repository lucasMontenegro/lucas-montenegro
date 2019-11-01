import { useRef } from "react"
export default function useTranslated (location) {
  const savedLocation = useRef(`savedLocation`)
  const savedLinks = useRef(`savedLinks`)
  return () => {
    if (savedLocation.current !== location) {
      savedLocation.current = location
      savedLinks.current = this.translate(location)
    }
    return savedLinks.current
  }
}