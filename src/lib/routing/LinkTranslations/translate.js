export default function translate (oldLanguage, location) {
  const intl = this.translators[oldLanguage].toIntl(location)
  return this.links.map(({ languageCode, languageName }) => ({
    key: languageCode,
    languageName,
    location: (
      oldLanguage === languageCode ? location :
      this.translators[languageCode].toLocal(intl)
    ),
  }))
}