import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
i18next
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV !== `production`,
    fallbackLng: `en`,
    whitelist: [`en`, `es`],
  })
export default i18next