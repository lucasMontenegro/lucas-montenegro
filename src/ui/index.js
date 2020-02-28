import languageDetector from "lib/languageDetector"
import React from "react"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
import { RoutingProvider } from "lib/react/routing/context"
import routing from "./routing"
import HandleRedirection from "lib/react/routing/HandleRedirection"
import Dashboard from "lib/react/Dashboard"
import Home from "lib/Home"
import NotFound from "lib/NotFound"
import ReactDOM from "react-dom"
import DarkMode from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { Auth0Provider } from "lib/react/auth0"
import getLogoutUrl from "./getLogoutUrl"
import { Router as ReactRouter, Route } from "react-router-dom"
import browserHistory from "lib/browserHistory"
import globals from "lib/utils/globals"
languageDetector.init(routing.languageCodes)
const clientLinks = {
  home: {
    Icon: () => <FontAwesomeIcon icon={[`fas`, `home`]} />,
    text: {
      en: () => `Home`,
      es: () => `Inicio`,
    },
  },
  notFound: {
    Icon: () => <FontAwesomeIcon icon={[`fas`, `dizzy`]} />,
    text: {
      en: () => `Not Found`,
      es: () => `No Encontrado`,
    },
  },
}
function App (props) {
  return languageDetector.useReadyState() ? (
    <Auth0Provider getLogoutUrl={getLogoutUrl}>
      <RoutingProvider routing={routing} location={props.location} clientLinks={clientLinks}>
        <HandleRedirection />
        <Dashboard>
          <Home />
          <NotFound />
        </Dashboard>
      </RoutingProvider>
    </Auth0Provider>
  ) : null
}
ReactDOM.render((
  <DarkMode>
    <Theme>
      <CssBaseline />
      <ReactRouter history={browserHistory}>
        <Route component={App} />
      </ReactRouter>
    </Theme>
  </DarkMode>
), globals.document.getElementById(`root`))