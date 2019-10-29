import translate from "lib/routing/LinkTranslations/translate"
import useHook from "lib/routing/LinkTranslations/useHook"
export default class LinkTranslations {
  constructor (clientName, routing) {
    this.translators = routing.linkTranslators[clientName]
    this.links = routing.languageCodes.map(languageCode => ({
      languageCode,
      languageName: routing.languageNames[languageCode],
    }))
  }
}
LinkTranslations.prototype.translate = translate
LinkTranslations.prototype.useHook = useHook