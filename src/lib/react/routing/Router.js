import Translation from "lib/Translation"
import languageDetector from "lib/languageDetector"
export default class Router {
  constructor (routing) {
    this.matchers = routing.matchers
    const initialLanguage = routing.languageCodes[0]
    this.locations = [`home`, `notFound`].reduce((byClient, clientName) => {
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
  }
  findRoute (location) {
    // detect root route
    if (this.matchers.root(location)) {
      return {
        render: {},
        redirect: this.locations.home.get(),
      }
    }
    { // detect language-only route
      const matcher = this.matchers.languageOnly.find(m => m.match(location))
      if (matcher) {
        languageDetector.set(matcher.languageCode)
        return {
          render: {},
          redirect: this.locations.home.get(),
        }
      }
    }
    { // find client route
      const matcher = this.matchers.client.find(m => m.match(location))
      if (matcher) {
        languageDetector.set(matcher.languageCode)
        const { clientName } = matcher
        return {
          clientName,
          render: { [clientName]: true },
          redirect: null,
        }
      }
    }
    { // detect unknown client
      const matcher = this.matchers.unknownClient.find(m => m.match(location))
      if (matcher) {
        languageDetector.set(matcher.languageCode)
        return {
          render: {},
          redirect: {
            ...this.locations.notFound.get(),
            state: location,
          },
        }
      }
    }
    return { // 404 redirection
      render: {},
      redirect: {
        ...this.locations.notFound.get(),
        state: location,
      },
    }
  }
}