import { useRef } from "react"
import makeLanguageDetector from "./makeLanguageDetector"
import findRoute from "./findRoute"
export { default as matchPropType } from "./matchPropType"
export default function makeRouter (routing) {
  const useLanguageDetector = makeLanguageDetector()
  return function useRouter (location) {
    const [detectedLanguage, setDetectedLanguage] = useLanguageDetector()
    const savedMatch = useRef(null)
    const savedLocation = useRef(null)
    if (!detectedLanguage) {
      return { type: `initializing` }
    }
    if (savedLocation.current === location) {
      return savedMatch.current
    }
    savedLocation.current = location
    savedMatch.current = findRoute(routing, location, detectedLanguage, setDetectedLanguage)
    return savedMatch.current
  }
}