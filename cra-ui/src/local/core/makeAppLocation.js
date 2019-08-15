import { useRef } from "react"
export default function makeAppLocation (initialLocation, translators) {
  return function useAppLocation (match, newLanguage, newLocation) {
    const languageCode = useRef(`en`)
    const location = useRef(initialLocation)
    const oldLanguage = languageCode.current
    if (match) {
      languageCode.current = newLanguage
      location.current = newLocation
    } else if (oldLanguage !== newLanguage) {
      languageCode.current = newLanguage
      const intl = translators[oldLanguage].toIntl(location.current)
      location.current = translators[newLanguage].toLocal(intl)
    }
    return location.current
  }
}