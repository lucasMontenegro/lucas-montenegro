import languageDetector from "lib/languageDetector"
export default function translate (location) {
  const oldLanguage = languageDetector.get()
  const fromOldLanguage = this.translators[oldLanguage]
  if (fromOldLanguage) {
    const intl = fromOldLanguage.toIntl(location)
    return this.links.map(({ languageCode, languageName }) => ({
      key: languageCode,
      languageName,
      location: (
        oldLanguage === languageCode ? location :
        this.translators[languageCode].toLocal(intl)
      ),
    }))
  }
  return []
}