import { useRef } from "react"
export default function makeClientLocation (options) {
  const { initialLocation, linkTranslators, forwardLocation } = options
  if (forwardLocation) {
    return function useForwardedClientLocation (match, newLanguage, newLocation) {
      return newLocation
    }
  }
  return function useClientLocation (match, newLanguage, newLocation) {
    const languageCode = useRef(`en`)
    const location = useRef(initialLocation)
    const oldLanguage = languageCode.current
    if (match) {
      languageCode.current = newLanguage
      location.current = newLocation
    } else if (oldLanguage !== newLanguage) {
      languageCode.current = newLanguage
      const intl = linkTranslators[oldLanguage].toIntl(location.current)
      location.current = linkTranslators[newLanguage].toLocal(intl)
    }
    return location.current
  }
}