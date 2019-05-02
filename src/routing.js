import React from "react"
import { Route, Redirect } from "react-router-dom"

export const createRouter = routes => {
  const persistent = routes.filter(route => !route.redirect && route.persistent)
  return () => <Route
    children={({ location }) => {
      const main = routes.find(route => route.match(location))
      if (main.redirect) {
        return main.redirect(location)
      }
      const hiddenSiblings = persistent.filter(route => route !== main)
        .map(route => route.render(false, location))
      return main.render(true, location, hiddenSiblings)
    }}
  />
}

export const localizedRoutes = opts => {
  const routes = []
  const {
    locales,
    persistent,
    name,
    Component,
  } = opts
  const langSegmentRegExp = /^\/([^/]+)/
  {
    const redirectKey = `${name}.Redirect`
    const { match } = opts.intl
    routes.push({
      match (location) {
        const cap = langSegmentRegExp.exec(location.pathname)
        const lang = cap && cap[1]
        return (lang && lang in locales) ? match(location) : false
      },
      redirect (location) {
        const locale = locales[langSegmentRegExp.exec(location.pathname)[1]]
        return <Redirect key={redirectKey} to={locale.from(location)} />
      }
    })
  }
  const langs = Object.keys(locales)
  routes.push(...langs.map(language => {
    const { match, toIntl } = locales[language]
    const componentKey = `${name}.Component`
    return {
      match,
      persistent,
      render (show, location, hiddenChildren) {
        const makeLink = toIntl(location)
        const languageLinks = langs.map(language => ({
          key: `${name}.languageLinks.${language}`,
          text: locales[language].name,
          to: makeLink(language),
        }))
        return <Component
          show={show}
          key={componentKey}
          language={language}
          navProps={{ language, location, languageLinks }}
          frameProps={{ hiddenChildren }}
        />
      },
    }
  }))
  return routes
}
