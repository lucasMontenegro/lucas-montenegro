import React from "react"
import Div from "lib/react/utils/Div"
import Link from "lib/react/links/Link"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { RoutingContext } from "lib/react/routing/context"
import Home from "./index.js"
import { Route, Switch } from "react-router-dom"
const languageCodes = [`en`, `es`]
function Navigation () {
  return (
    <Div color="Salmon">
      <h4>Links</h4>
      <ul>
        <li>
          <h5>Light</h5>
          <ul>
            <li><Link to="/Home/en/light">English</Link></li>
            <li><Link to="/Home/es/light">Spanish</Link></li>
          </ul>
        </li>
        <li>
          <h5>Dark</h5>
          <ul>
            <li><Link to="/Home/en/dark">English</Link></li>
            <li><Link to="/Home/es/dark">Spanish</Link></li>
          </ul>
        </li>
      </ul>
    </Div>
  )
}
function Example (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    languageDetector.set(props.match.params.languageCode)
    return (
      <DarkModeContext.Provider value={{ value: props.match.params.mode === `dark` }}>
        <Theme>
          <CssBaseline />
          <RoutingContext.Provider
            value={{
              route: { render: { home: true } },
              clientLinks: [],
            }}
          >
            <Home />
          </RoutingContext.Provider>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (
  <Route
    path="/Home"
    render={() => (
      <Switch>
        <Route exact path="/Home" component={Navigation} />
        <Route exact path="/Home/:languageCode/:mode" component={Example} />
      </Switch>
    )}
  />
)