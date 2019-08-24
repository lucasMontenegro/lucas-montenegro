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
export default i18next