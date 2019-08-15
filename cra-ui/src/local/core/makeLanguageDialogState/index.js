import { useState, useRef } from "react"
import translateLocation from "./translateLocation"
export default function makeLanguageDialogState (initialLocation, translators) {
  const initialRef = {
    location: initialLocation,
    translations: translateLocation(`en`, initialLocation, translators),
  }
  return function useLanguageDialogState (languageCode, location) {
    const [isOpen, setOpenState] = useState(false)
    const ref = useRef(initialRef)
    if (isOpen && location !== ref.current.location) {
      ref.current = {
        location,
        translations: translateLocation(languageCode, location, translators),
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