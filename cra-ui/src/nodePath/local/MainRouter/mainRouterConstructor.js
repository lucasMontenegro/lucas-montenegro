function mainRouterConstructor (options) {
  //  options = {
  //    languages: {
  //      ...[language code]: full name,
  //    },
  //    matchRoot: function to match the route where the app is mounted,
  //    apps: {
  //      ...[camel case name]: {
  //        AppBody: main content of the app,
  //        AppMenu: component to render in the menu,
  //        locales: {
  //          ...[language code]: {
  //            match: function (location) --> boolean, // check if location matches route
  //            translateLink: {
  //              toIntl: function (location) --> location,
  //              toLocal: function (location) --> location,
  //            },
  //            navLink: {
  //              location: initial app location,
  //              text,
  //              icon,
  //            },
  //          },
  //        },
  //      },
  //    },
  //  }
  this.matchRoot = options.matchRoot
  const appNames = Object.keys(options.apps)
  const languageCodes = this.languageCodes = Object.keys(options.languages)
  this.locations = appNames.reduce((locations, appName) => {
    const { locales } = options.apps[appName]
    locations[appName] = {
      original: null,
      translations: languageCodes.reduce((output, languageCode) => {
        output[languageCode] = locales[languageCode].navLink.location
        return output
      }, {}),
    }
    return locations
  }, {})
  this.appBodies = appNames.map(appName => ({
    appName,
    AppBody: options.apps[appName].AppBody
  }))
  this.routes = appNames.map(appName => {
    const { locales } = options.apps[appName]
    return languageCodes.map(languageCode => ({
      appName,
      languageCode,
      match: locales[languageCode].match,
    }))
  }).reduce((routes, arr) => {
    routes.push(...arr)
    return routes
  }, [])
  {
    const { locales } = options.apps.notFound
    const notFoundLocations = languageCodes.reduce((locations, languageCode) => {
      locations[languageCode] = locales[languageCode].navLink.location
      return locations
    }, {})
    this.makeNotFoundLocation = function makeNotFoundLocation (languageCode, referrer) {
      return {
        ...notFoundLocations[languageCode],
        state: { referrer },
      }
    }
  }
  this.translate = appNames.reduce((translateFor, appName) => {
    const { locales } = options.apps[appName]
    translateFor[appName] = languageCodes.reduce((translateFrom, oldLanguage) => {
      translateFrom[oldLanguage] = languageCodes.reduce((translateTo, newLanguage) => {
        if (oldLanguage === newLanguage) {
          translateTo[newLanguage] = location => location
        } else {
          const { toIntl } = locales[oldLanguage].translateLink
          const { toLocal } = locales[newLanguage].translateLink
          translateTo[newLanguage] = location => toLocal(toIntl(location))
        }
        return translateTo
      }, {})
      return translateFrom
    }, {})
    return translateFor
  }, {})
  this.appMenus = appNames.reduce((appMenus, appName) => {
    appMenus[appName] = options.apps[appName].AppMenu
    return appMenus
  }, {})
  this.navLinks = languageCodes.reduce((navLinks, languageCode) => {
    navLinks[languageCode] = appNames.map(appName => {
      const { text, icon } = options.apps[appName].locales[languageCode].navLink
      return { appName, text, icon }
    })
    return navLinks
  }, {})
  this.languageLinks = languageCodes.map(languageCode => ({
    languageCode,
    text: options.languages[languageCode],
  }))
}
export default mainRouterConstructor