import supportedLanguages from "local/supportedLanguages"
export default function translateLocation (oldLanguage, location, linkTranslators) {
  const intlLocation = linkTranslators[oldLanguage].toIntl(location)
  return supportedLanguages.reduce((translations, newLanguage) => {
    translations[newLanguage] = (
      oldLanguage === newLanguage ? location : linkTranslators[newLanguage].toLocal(intlLocation)
    )
    return translations
  }, {})
}