import supportedLanguages from "local/supportedLanguages"
export default function translateLocation (oldLanguage, location, translators) {
  const intlLocation = translators[oldLanguage].toIntl(location)
  return supportedLanguages.reduce((translations, newLanguage) => {
    translations[newLanguage] = (
      oldLanguage === newLanguage ? location : translators[newLanguage].toLocal(intlLocation)
    )
    return translations
  }, {})
}