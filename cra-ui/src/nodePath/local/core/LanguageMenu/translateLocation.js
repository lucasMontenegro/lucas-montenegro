const languageCodes = [`en`, `es`]
export default function translateLocation (oldLanguage, location, translations) {
  const intlLocation = translations[oldLanguage].toIntl(location)
  return languageCodes.reduce((locations, newLanguage) => {
    locations[newLanguage] = (
      oldLanguage === newLanguage ? location : translations[newLanguage].toLocal(intlLocation)
    )
    return locations
  }, {})
}