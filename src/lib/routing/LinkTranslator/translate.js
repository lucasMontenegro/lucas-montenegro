import languageDetector from "lib/languageDetector"
export default function translate (location) {
  const oldLanguage = languageDetector.get()
  const fromOldLanguage = this.functions[oldLanguage]
  if (fromOldLanguage) {
    const intl = fromOldLanguage.toIntl(location)
    return this.links.map(({ key, text, languageCode }) => ({
      key,
      text,
      languageCode,
      location: (
        oldLanguage === languageCode ? location :
        this.functions[languageCode].toLocal(intl)
      ),
    }))
  }
  return []
}