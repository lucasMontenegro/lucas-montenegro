import { useLayoutEffect, useState } from "react"
import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import supportedLanguages from "local/supportedLanguages"
i18next
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV !== `production`,
    fallbackLng: `en`,
    whitelist: supportedLanguages,
  })
export default function makeLanguageDetector () {
  function setDetectedLanguage (languageCode) {
    i18next.changeLanguage(languageCode)
  }
  return function useLanguageDetector () {
    const [isInitialized, setInitialized] = useState(false)
    useLayoutEffect(() => {
      if (i18next.isInitialized) {
        setInitialized(true)
      } else {
        function initializedCallback () {
          setInitialized(true)
        }
        i18next.on(`initialized`, initializedCallback)
        return () => i18next.off(`initialized`, initializedCallback)
      }
    }, [])
    return [isInitialized ? i18next.language : null, setDetectedLanguage]
  }
}