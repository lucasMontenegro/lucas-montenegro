function mainRouterConstructor (options) {
  //  options = {
  //    defaultLanguage,
  //    supportedLanguages,
  //    matchRoot: function to match the route where the app is mounted,
  //    apps: {
  //      ...[camel case name]: {
  //        location: initial value corresponding to the defaultLanguage,
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
  //              text,
  //              icon,
  //            },
  //          },
  //        },
  //      },
  //    },
  //  }
  this.Frame = options.Frame
  this.languageCode = options.defaultLanguage
  this.matchRoot = options.matchRoot
  const appNames = Object.keys(options.apps)
  const { supportedLanguages } = options
  this.locations = appNames.reduce((locations, appName) => {
    locations[appName] = options.apps[appName].location
    return locations
  }, {})
  this.appBodies = appNames.map(appName => ({
    appName,
    AppBody: options.apps[appName].AppBody
  }))
  this.routes = appNames.map(appName => {
    const { locales } = options.apps[appName]
    return supportedLanguages.map(languageCode => ({
      appName,
      languageCode,
      match: locales[languageCode].match,
    }))
  }).reduce((routes, arr) => {
    routes.push(...arr)
    return routes
  }, [])
  this.translateLocationFrom = supportedLanguages.reduce((translateFrom, oldLanguage) => {
    translateFrom[oldLanguage] = supportedLanguages.reduce((translateTo, newLanguage) => {
      if (oldLanguage === newLanguage) {
        translateTo[newLanguage] = appNames.reduce((translateFor, appName) => {
          translateFor[appName] = location => location
          return translateFor
        }, {})
      } else {
        translateTo[newLanguage] = appNames.reduce((translateFor, appName) => {
          const { locales } = options.apps[appName]
          const { toIntl } = locales[oldLanguage].translateLink
          const { toLocal } = locales[newLanguage].translateLink
          translateFor[appName] = location => toLocal(toIntl(location))
          return translateFor
        }, {})
      }
      return translateTo
    }, {})
    return translateFrom
  }, {})
  this.appMenus = appNames.reduce((appMenus, appName) => {
    appMenus[appName] = options.apps[appName].AppMenu
    return appMenus
  }, {})
  this.navLinks = supportedLanguages.reduce((navLinks, languageCode) => {
    navLinks[languageCode] = appNames.map(appName => {
      const { text, icon } = options.apps[appName].locales[languageCode].navLink
      return { appName, text, icon }
    })
    return navLinks
  }, {})
}
export default mainRouterConstructor