import { useState, useRef } from "react"
import translateLocation from "new/local/paperbase/makeClientLocation/translateLocation"
import PropTypes from "prop-types"
import { languageCodePropType } from "new/local/supportedLanguages"
import linkTranslationsPropType from "new/local/paperbase/propTypes/linkTranslationsPropType"
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
export const languageDialogStatePropType = PropTypes.shape({
  languageCode: languageCodePropType.isRequired,
  translations: linkTranslationsPropType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
})