import useClientLocation from "lib/routing/ClientNavigator/useClientLocation"
export default class ClientNavigator {
  constructor (clientName, routing) {
    this.initialLanguage = routing.languageCodes[0]
    this.initialLocation = routing.locations[clientName]
    this.translators = routing.linkTranslators[clientName]
  }
}
ClientNavigator.prototype.useClientLocation = useClientLocation