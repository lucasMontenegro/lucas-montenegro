import React from "react"
import { Redirect } from "react-router-dom"

export default opts => {
  const routes = []
  const {
    name,
    makeInternationalMatch,
    locales,
    Component,
  } = opts
  const languages = Object.keys(locales)

  // redirect from internationalized route to the localized one
  routes.push(...languages.map(language => {
    const { localize } = locales[language]
    return {
      match: makeInternationalMatch(language),
      render (match, location) {
        if (match) {
          return <Redirect key={`${name}.redirect`} to={localize(location)} />
        }
        return null
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
        return (
          <Component
            key={name}
            match
            location={location}
            language={/^\/([^/]+)/.exec(location.pathname)[1]}
          />
        )
      }
      return <Component key={name} />
    },
  })

  return routes
}
