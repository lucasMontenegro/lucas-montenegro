import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import config from "./config"

i18n
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV !== `production`,
    fallbackLng: config.defaultLanguage,
    whitelist: config.languageCodes,
  })
