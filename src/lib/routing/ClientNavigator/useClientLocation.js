import { useRef } from "react"
import languageDetector from "lib/languageDetector"
export default function useClientLocation (match, location) {
  const languageCode = languageDetector.get()
  const savedLanguage = useRef(this.initialLanguage)
  const savedLocation = useRef(this.initialLocation)
  if (match) {
    savedLanguage.current = languageCode
    savedLocation.current = location
  } else if (savedLanguage.current !== languageCode) {
    const intl = this.translators[savedLanguage.current].toIntl(savedLocation.current)
    savedLanguage.current = languageCode
    savedLocation.current = this.translators[languageCode].toLocal(intl)
  }
  return savedLocation.current
}