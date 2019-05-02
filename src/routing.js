import React from "react"
import { Route, Redirect } from "react-router-dom"

export const createRouter = routes => {
  const persistent = routes.filter(route => !route.redirect && route.persistent)
  return () => <Route
    children={props => {
      const main = routes.find(route => route.match(props.location))
      if (main.redirect) {
        return main.redirect(props)
      }
      const hiddenSiblings = persistent.filter(route => route !== main)
        .map(route => route.render(false, props))
      return main.render(true, props, hiddenSiblings)
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
      redirect ({ location }) {
        const locale = locales[langSegmentRegExp.exec(location.pathname)[1]]
        return <Redirect key={redirectKey} to={locale.from(location)} />
      }
    })
  }
  routes.push(...Object.keys(locales).map(lang => {
    const { match } = locales[lang]
    const componentKey = `${name}.Component`
    return {
      match,
      persistent,
      render (show, props, hiddenSiblings) {
        return <Component
          show={show}
          key={componentKey}
          language={lang}
          hiddenSiblings={hiddenSiblings}
          {...props}
        />
      },
    }
  }))
  return routes
}
