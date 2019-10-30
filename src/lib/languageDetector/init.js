import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import isProduction from "lib/utils/isProduction"
export default function init (whitelist) {
  if (i18next.isInitialized) return
  i18next
    .use(LanguageDetector)
    .init({
      debug: !isProduction(),
      fallbackLng: whitelist[0],
      whitelist,
    })
}