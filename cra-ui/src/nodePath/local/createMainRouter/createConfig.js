import React from "react"
import { Redirect } from "react-router"
const createConfig = options => {
  //  options = {
  //    defaultLanguage: language code,
  //    languages: {
  //      ...[language code]: full name,
  //    },
  //    matchRoot: function to match the route where the app is mounted,
  //    apps: {
  //      ...[camel case name]: {
  //        Component: to be rendered,
  //        locales: {
  //          ...[language code]: {
  //            match: function (location) --> boolean, // check if location matches route
  //            translateLink: {
  //              toIntl: function (location) --> location,
  //              toLocal: function (location) --> location,
  //            },
  //            navLink: {
  //              location: starting app location,
  //              text,
  //              icon,
  //            },
  //          },
  //        },
  //      },
  //    },
  //  }
  const { defaultLanguage, languages, apps } = options
  const routes = []
  const languageCodes = Object.keys(languages)
  const appNames = Object.keys(apps)
  const appList = appNames.map(name => ({ ...apps[name], name }))


  // NAV LINKS
  const navLinks = languageCodes.reduce((links, language) => {
    links[language] = appList.map(app => {
      const { text, icon } = app.locales[language].navLink
      return { key: app.name, text, icon }
    })
    return links
  }, {})
  const initialNavLocations = languageCodes.reduce((byLang, language) => {
    byLang[language] = appList.reduce((locations, app) => {
      locations[app.name] = app.locales[language].navLink.location
      return locations
    }, {})
    return byLang
  }, {})
  // END NAV LINKS


  // ROUTES
  //  route = {
  //    name,
  //    isRedirect,
  //    language, // code
  //    match,
  //    Component,
  //  }

  // redirect to home app
  routes.push({
    key: `homeRedirect`,
    isRedirect: true,
    match: options.matchRoot,
    Component: function HomeRedirect (props) {
      if (!props.match) {
        return null
      }
      return <Redirect to={initialNavLocations[props.language].home}/>
    }
  })

  // displayed app routes
  appList
    .map(({ name, locales, Component }) => (
      languageCodes.map(language => ({
        key: `${name}.${language}`,
        name,
        isRedirect: false,
        language,
        match: locales[language].match,
        Component,
      }))
    ))
    .reduce((routes, arr) => {
      routes.push(...arr)
      return routes
    }, routes)

  // redirect to notFound app
  routes.push({
    key: `notFoundRedirect`,
    isRedirect: true,
    match () {
      return true
    },
    Component: function NotFoundRedirect (props) {
      if (!props.match) {
        return null
      }
      const location = {
        ...initialNavLocations[props.language].notFound,
        state: { referrer: props.routerProps.location },
      }
      return <Redirect to={location} />
    }
  })
  // END ROUTES


  // TRANSLATE LOCATION
  //  translateLocationFrom = {
  //    ...otherLanguages,
  //    [language]: {
  //      to: {
  //        [newLanguage]: {
  //          ...otherApps,
  //          [appName],
  //          ^^^ function -> translateLocationFrom[language].for[activeApp][newLanguage]
  //          ^^^ for translating the current location
  //        },
  //      },
  //      for: {
  //        [activeApp]: {
  //          ...otherLanguages,
  //          [newLanguage],
  //          ^^^ function -> translateLocationFrom[language].to[newLanguage][appName]
  //          ^^^ for translating navigation links
  //        },
  //      },
  //    },
  //  }
  const translateLocationFrom = (() => {
    const temp = appNames.reduce((outputAN, appName) => {
      const { locales } = apps[appName]
      outputAN[appName] = languageCodes.reduce((outputOL, oldLanguage) => {
        outputOL[oldLanguage] = languageCodes.reduce((outputNL, newLanguage) => {
          if (oldLanguage === newLanguage) {
            outputNL[newLanguage] = location => location
          } else {
            const { toIntl } = locales[oldLanguage].translateLink
            const { toLocal } = locales[newLanguage].translateLink
            outputNL[newLanguage] = location => toLocal(toIntl(location))
          }
          return outputNL
        }, {})
        return outputOL
      }, {})
      return outputAN
    }, {})
    return languageCodes.reduce((translateLocationFrom, oldLanguage) => {
      translateLocationFrom[oldLanguage] = {
        to: languageCodes.reduce((to, newLanguage) => {
          to[newLanguage] = appNames.reduce((forApp, appName) => {
            forApp[appName] = temp[appName][oldLanguage][newLanguage]
            return forApp
          }, {})
          return to
        }, {}),
        for: appNames.reduce((forApp, appName) => {
          forApp[appName] = languageCodes.reduce((to, newLanguage) => {
            to[newLanguage] = temp[appName][oldLanguage][newLanguage]
            return to
          }, {})
          return forApp
        }, {}),
      }
      return translateLocationFrom
    }, {})
  })()
  // END TRANSLATE LOCATION


  return {
    defaultLanguage,
    languageCodes,
    initialNavLocations,
    routes,
    appNames,
    translateLocationFrom,
    navLinks,
    languageLinks: languageCodes.map(code => ({ key: code, text: languages[code] })),
  }
}
export default createConfig