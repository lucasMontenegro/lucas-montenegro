import languageDetector from "lib/languageDetector"
export default class Router {
  constructor (routing) {
    this.matchers = routing.matchers
    this.locations = routing.translatedLocations
  }
  findRoute (location) {
    // detect root route
    if (this.matchers.root(location)) {
      return {
        location,
        render: {},
        redirect: this.locations.home.get(),
      }
    }
    { // detect language-only route
      const matcher = this.matchers.languageOnly.find(m => m.match(location))
      if (matcher) {
        languageDetector.set(matcher.languageCode)
        return {
          location,
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
          location,
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
          location,
          render: {},
          redirect: {
            ...this.locations.notFound.get(),
            state: location,
          },
        }
      }
    }
    return { // 404 redirection
      location,
      render: {},
      redirect: {
        ...this.locations.notFound.get(),
        state: location,
      },
    }
  }
}