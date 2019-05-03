import React from "react"
import { Redirect } from "react-router-dom"

export default opts => {
  const routes = []
  const {
    name,
    makeInternationalMatch,
    locales,
    render,
  } = opts
  const languages = Object.keys(locales)

  // redirect from internationalized route to the localized one
  routes.push(...languages.map(language => {
    const { international } = locales[language]
    return {
      match: makeInternationalMatch(language),
      render (match, location) {
        if (match) {
          return {
            hideDrawer: true,
            node: <Redirect key={`${name}.${language}.redirect`} to={international(location)} />
          }
        }
        return { node: null }
      },
    }
  }))

  const matchFunctions = languages.map(language => locales[language].match)
  routes.push({
    match (location) {
      return Boolean(matchFunctions.find(match => match(location)))
    },
    render (match, location) {
      if (match) {
        const language = /^\/([^/]+)/.exec(location.pathname)[1]
        const locale = locales[language]
        const languageLinks = languages.map(locale.languageLinkFactory(location, locales))
        return render(true, language, { language, location, languageLinks })
      }
      return render(false)
    },
  })

  return routes
}
