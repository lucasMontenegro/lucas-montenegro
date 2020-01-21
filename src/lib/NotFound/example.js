import React from "react"
import Div from "lib/react/utils/Div"
import Link from "lib/react/links/Link"
import Translation from "lib/Translation"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { RoutingContext } from "lib/react/routing/context"
import NotFound from "./index.js"
import { Route, Switch } from "react-router-dom"
const languageCodes = [`en`, `es`]
const referrer = { pathname: `/404`, search: `?foo=1`, hash: `#xyz` }
function Navigation () {
  return (
    <Div color="Salmon">
      <h4>Links</h4>
      <ul>
        <li>
          <h5>Light</h5>
          <ul>
            <li><Link to={{ pathname: `/NotFound/en/light`, state: referrer }}>English</Link></li>
            <li><Link to={{ pathname: `/NotFound/es/light`, state: referrer }}>Spanish</Link></li>
          </ul>
        </li>
        <li>
          <h5>Dark</h5>
          <ul>
            <li><Link to={{ pathname: `/NotFound/en/dark`, state: referrer }}>English</Link></li>
            <li><Link to={{ pathname: `/NotFound/es/dark`, state: referrer }}>Spanish</Link></li>
          </ul>
        </li>
      </ul>
    </Div>
  )
}
function Home () {
  return `Home`
}
const darkRouting = {
  translatedLocations: {
    home: new Translation({
      en: { pathname: `/NotFound/home` },
      es: { pathname: `/NotFound/home` },
    }),
    notFound: new Translation({
      en: { pathname: `/NotFound/en/dark` },
      es: { pathname: `/NotFound/es/dark` },
    }),
  },
}
const lightRouting = {
  translatedLocations: {
    home: new Translation({
      en: { pathname: `/NotFound/home` },
      es: { pathname: `/NotFound/home` },
    }),
    notFound: new Translation({
      en: { pathname: `/NotFound/en/light` },
      es: { pathname: `/NotFound/es/light` },
    }),
  },
}
function Example (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    languageDetector.set(props.match.params.languageCode)
    const isDark = props.match.params.mode === `dark`
    return (
      <DarkModeContext.Provider value={{ value: isDark }}>
        <Theme>
          <CssBaseline />
          <RoutingContext.Provider
            value={{
              routing: isDark ? darkRouting : lightRouting,
              route: { location: props.location, render: { notFound: true } },
            }}
          >
            <NotFound />
          </RoutingContext.Provider>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (
  <Route
    path="/NotFound"
    render={() => (
      <Switch>
        <Route exact path="/NotFound" component={Navigation} />
        <Route exact path="/NotFound/home" component={Home} />
        <Route exact path="/NotFound/:languageCode/:mode" component={Example} />
      </Switch>
    )}
  />
)