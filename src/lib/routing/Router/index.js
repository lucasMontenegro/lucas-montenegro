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
    this.locations = routing.locations
    const clientNames = Object.keys(routing.matchers.client.reduce((obj, matcher) => {
      obj[matcher.clientName] = null
      return obj
    }, {}))
    const makeRenderObject = name => clientNames.reduce((render, str) => {
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