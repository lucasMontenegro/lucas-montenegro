import { useRef } from "react"
import languageDetector from "lib/languageDetector"
export default function useRoute (location) {
  const ready = languageDetector.useReadyState()
  const savedLocation = useRef(`savedLocation`)
  const savedRoute = useRef(`savedRoute`)
  if (ready) {
    if (savedLocation.current !== location) {
      savedLocation.current = location
      savedRoute.current = this.findRoute(location)
    }
    return savedRoute.current
  }
  return {
    render: this.renderEmpty,
    languageCode: `en`,
    redirect: null,
  }
}