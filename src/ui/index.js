import languageDetector from "lib/languageDetector"
import React from "react"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
import { RoutingProvider } from "lib/react/routing/context"
import routing from "./routing"
import HandleRedirection from "lib/react/routing/HandleRedirection"
import AppDrawer from "lib/react/AppDrawer"
import Home from "lib/Home"
import NotFound from "lib/NotFound"
import ReactDOM from "react-dom"
import DarkMode from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { BrowserRouter, Route } from "react-router-dom"
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
    <RoutingProvider routing={routing} location={props.location} clientLinks={clientLinks}>
      <HandleRedirection />
      <AppDrawer>
        <Home />
        <NotFound />
      </AppDrawer>
    </RoutingProvider>
  ) : null
}
ReactDOM.render((
  <DarkMode>
    <Theme>
      <CssBaseline />
      <BrowserRouter><Route component={App} /></BrowserRouter>
    </Theme>
  </DarkMode>
), globals.document.getElementById(`root`))