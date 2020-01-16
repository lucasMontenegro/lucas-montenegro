import translate from "lib/routing/LinkTranslator/translate"
import useTranslated from "lib/routing/LinkTranslator/useTranslated"
export default class LinkTranslator {
  constructor (clientName, routing) {
    this.functions = routing.linkTranslators[clientName]
    this.links = routing.languageCodes.map(languageCode => ({
      languageCode,
      otherProps: {
        key: languageCode,
        id: `translate-to-${languageCode}`,
        text: routing.languageNames[languageCode],
      },
    }))
  }
}
LinkTranslator.prototype.translate = translate
LinkTranslator.prototype.useTranslated = useTranslated