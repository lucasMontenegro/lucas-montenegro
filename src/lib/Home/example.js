import React from "react"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { Auth0Context } from "lib/react/auth0"
import { RoutingContext } from "lib/react/routing/context"
import { DashboardContext } from "lib/react/Dashboard"
import Home from "./index.js"
import { Route } from "react-router-dom"
const languageCodes = [`en`, `es`]
function Example (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    const { params } = props.match
    languageDetector.set(params.languageCode)
    return (
      <DarkModeContext.Provider value={{ value: params.mode === `dark` }}>
        <Theme>
          <CssBaseline />
          <Auth0Context.Provider
            value={{
              user: params.loggedIn === `logged-in` ? {} : undefined,
              login: () => console.log(`auth0.login`)
            }}
          >
            <RoutingContext.Provider
              value={{
                route: { render: { home: true } },
                clientLinks: [],
              }}
            >
              <DashboardContext.Provider value={() => console.log(`open dashboard`)}>
                <Home />
              </DashboardContext.Provider>
            </RoutingContext.Provider>
          </Auth0Context.Provider>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (<Route exact path="/Home/:loggedIn/:mode/:languageCode" component={Example} />)