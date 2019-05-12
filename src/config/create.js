import React from "react"
import { Redirect } from "react-router"

const createConfig = ({ defaultLanguage, languages, apps }) => {
  const routes = []
  const languageCodes = Object.keys(languages)

  const appNames = Object.keys(apps)
  const appsList = appNames.map(name => ({
    ...apps[name],
    name,
  }))


  // ROUTES
  //  route = {
  //    name,
  //    isRedirect,
  //    language,
  //    match,
  //    Component,
  //  }

  // redirect to home app
  routes.push({
    key: `homeRedirect`,
    isRedirect: true,
    match ({ pathname }) {
      return !pathname || pathname === `/`
    },
    Component (props) {
      if (!props.match) {
        return null
      }
      return <Redirect to={props.frameProps.navLinks.home} />
    }
  })

  // displayed app routes
  appsList
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
    Component (props) {
      if (!props.match) {
        return null
      }
      const notFoundLocation = props.frameProps.navLinks.notFound
      const state = notFoundLocation.state
        ? { ...notFoundLocation.state }
        : {}
      state.referrer = props.routerProps.location
      return <Redirect to={{ ...notFoundLocation, state }} />
    }
  })
  // END ROUTES


  // NAV LINKS
  //  navLinks = {
  //    initialLocations,
  //    byLanguage,
  //  }
  const navLinks = {}
  navLinks.initialLocations = languageCodes.reduce((initialLocations, language) => {
    initialLocations[language] = appsList.reduce((output, app) => {
      output[app.name] = app.locales[language].navLink.location
      return output
    }, {})
    return initialLocations
  }, {})
  navLinks.byLanguage = languageCodes.reduce((navLinksByLanguage, language) => {
    navLinksByLanguage[language] = appsList.map(app => {
      const { text, icon } = app.locales[language].navLink
      return { name: app.name, text, icon }
    })
    return navLinksByLanguage
  }, {})
  // END NAV LINKS


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
    languages: languageCodes.map(code => ({ ...languages[code], code })),
    languageCodes,
    appNames,
    routes,
    navLinks,
    translateLocationFrom,
  }
}

export default createConfig
