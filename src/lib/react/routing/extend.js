import Translation from "lib/Translation"
export default function extendRouting (routing) {
  const initialLanguage = routing.languageCodes[0]
  routing.translatedLocations = Object.keys(routing.locations).reduce((byClient, clientName) => {
    const location = routing.locations[clientName]
    const translators = routing.linkTranslators[clientName]
    const intl = translators[initialLanguage].toIntl(location)
    byClient[clientName] = new Translation(
      routing.languageCodes.reduce((byLanguage, newLanguage) => {
        byLanguage[newLanguage] = (
          initialLanguage === newLanguage ? location : translators[newLanguage].toLocal(intl)
        )
        return byLanguage
      }, {})
    )
    return byClient
  }, {})
  return routing
}