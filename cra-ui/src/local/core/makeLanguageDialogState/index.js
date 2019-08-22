import { useState, useRef } from "react"
import translateLocation from "./translateLocation"
export default function makeLanguageDialogState ({ initialLocation, linkTranslators }) {
  const initialRef = {
    location: initialLocation,
    translations: translateLocation(`en`, initialLocation, linkTranslators),
  }
  return function useLanguageDialogState (languageCode, location) {
    const [isOpen, setOpenState] = useState(false)
    const ref = useRef(initialRef)
    if (isOpen && location !== ref.current.location) {
      ref.current = {
        location,
        translations: translateLocation(languageCode, location, linkTranslators),
      }
    }
    return {
      languageCode,
      translations: ref.current.translations,
      isOpen,
      open () {
        setOpenState(true)
      },
      close () {
        setOpenState(false)
      },
    }
  }
}