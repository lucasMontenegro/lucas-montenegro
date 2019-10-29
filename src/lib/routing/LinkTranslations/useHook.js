import { useRef } from "react"
export default function useHook (languageCode, location) {
  const savedLocation = useRef(`savedLocation`)
  const savedLinks = useRef(`savedLinks`)
  return () => {
    if (savedLocation.current !== location) {
      savedLocation.current = location
      savedLinks.current = this.translate(languageCode, location)
    }
    return savedLinks.current
  }
}