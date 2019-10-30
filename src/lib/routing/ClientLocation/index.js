import useHook from "lib/routing/ClientLocation/useHook"
export default class ClientLocation {
  constructor (clientName, routing) {
    this.initialLanguage = routing.languageCodes[0]
    this.initialLocation = routing.locations[clientName]
    this.translators = routing.linkTranslators[clientName]
  }
}
ClientLocation.prototype.useHook = useHook