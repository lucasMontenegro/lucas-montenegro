import React from "react"
import { Redirect } from "react-router-dom"
import l10n from "./l10n"
import LanguageNotFound from "./LanguageNotFound"
import Nav from "./Nav"
import Frame from "./Frame"

export default routerProps => {
  const { location, history } = routerProps
  const { pathname } = location
  if (pathname === '/') {
    return <Redirect to={l10n.english.home} />
  }
  const cap = /^\/([^/]+)/.exec(pathname)
  const lang = cap && cap[1]
  const langRoute = lang && l10n[lang]
  if (!langRoute) {
    return <LanguageNotFound history={history} />
  }
  if (pathname.length <= lang.length + 2) {
    return <Redirect to={langRoute.home} />
  }
  const innerRoute = Object.values(langRoute.routes).find(route => route.match(location))
  const nav = <Nav render={langRoute.nav} history={history} />
  if (!innerRoute) {
    return <Frame render={langRoute.notFound} nav={nav} />
  }
  return <Frame render={innerRoute.render} nav={nav} />
}
