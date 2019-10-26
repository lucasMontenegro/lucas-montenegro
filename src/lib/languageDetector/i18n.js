import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import supportedLanguages from "languages/supported"
import isProduction from "lib/utils/isProduction"
export function init () {
  if (i18next.isInitialized) return
  i18next
    .use(LanguageDetector)
    .init({
      debug: !isProduction(),
      fallbackLng: `en`,
      whitelist: supportedLanguages,
    })
}
export function get () {
  return i18next.language
}
export function set (languageCode) {
  i18next.changeLanguage(languageCode)
}