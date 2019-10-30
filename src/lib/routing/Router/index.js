import languageDetector from "lib/languageDetector"
import useRoute from "lib/routing/Router/useRoute"
import findRoute from "lib/routing/Router/findRoute"
import findRoot from "lib/routing/Router/findRoot"
import findLanguageOnly from "lib/routing/Router/findLanguageOnly"
import findClient from "lib/routing/Router/findClient"
import findLanguage404 from "lib/routing/Router/findLanguage404"
import redirect404 from "lib/routing/Router/redirect404"
export default class Router {
  constructor (routing) {
    languageDetector.init(routing.languageCodes)
    this.locations = routing.locations
    const clientNames = Object.keys(routing.routes.client.reduce((obj, route) => {
      obj[route.clientName] = null
      return obj
    }, {}))
    const makeRenderObject = name => clientNames.reduce((render, str) => {
      render[str] = name === str
      return render
    }, {})
    this.renderEmpty = makeRenderObject(null)
    this.routes = {
      ...routing.routes,
      client: routing.routes.client.map(({ clientName, ...route }) => {
        route.render = makeRenderObject(clientName)
        return route
      }),
    }
  }
}
Router.prototype.useRoute = useRoute
Router.prototype.findRoute = findRoute
Router.prototype.findRoot = findRoot
Router.prototype.findLanguageOnly = findLanguageOnly
Router.prototype.findClient = findClient
Router.prototype.findLanguage404 = findLanguage404
Router.prototype.redirect404 = redirect404