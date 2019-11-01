import languageDetector from "lib/languageDetector"
import useRoute from "lib/routing/Router/useRoute"
import findRoute from "lib/routing/Router/findRoute"
import findRoot from "lib/routing/Router/findRoot"
import findLanguageOnly from "lib/routing/Router/findLanguageOnly"
import findClient from "lib/routing/Router/findClient"
import findUnknownClient from "lib/routing/Router/findUnknownClient"
import redirect404 from "lib/routing/Router/redirect404"
export default class Router {
  constructor (routing) {
    languageDetector.init(routing.languageCodes)
    {
      const initialLanguage = routing.languageCodes[0]
      this.locations = [`home`, `notFound`].reduce((byClient, clientName) => {
        const location = routing.locations[clientName]
        const translators = routing.linkTranslators[clientName]
        const intl = translators[initialLanguage].toIntl(location)
        byClient[clientName] = routing.languageCodes.reduce((byLanguage, newLanguage) => {
          byLanguage[newLanguage] = (
            initialLanguage === newLanguage ? location : translators[newLanguage].toLocal(intl)
          )
          return byLanguage
        }, {})
        return byClient
      }, {})
    }
    const makeRenderObject = name => routing.clientNames.reduce((render, str) => {
      render[str] = name === str
      return render
    }, {})
    this.renderEmpty = makeRenderObject(null)
    this.matchers = {
      ...routing.matchers,
      client: routing.matchers.client.map(({ clientName, ...matchers }) => {
        matchers.render = makeRenderObject(clientName)
        return matchers
      }),
    }
  }
}
Router.prototype.useRoute = useRoute
Router.prototype.findRoute = findRoute
Router.prototype.findRoot = findRoot
Router.prototype.findLanguageOnly = findLanguageOnly
Router.prototype.findClient = findClient
Router.prototype.findUnknownClient = findUnknownClient
Router.prototype.redirect404 = redirect404