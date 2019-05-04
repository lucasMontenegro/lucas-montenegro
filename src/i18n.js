import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV !== `production`,
  })
