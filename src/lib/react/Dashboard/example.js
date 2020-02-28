import React from "react"
import CommuteIcon from "@material-ui/icons/Commute"
import WorkIcon from "@material-ui/icons/Work"
import Div from "lib/react/utils/Div"
import Button from "@material-ui/core/Button"
import Dashboard, { useDashboardOpener } from "./index.js"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { Auth0Context } from "lib/react/auth0"
import { RoutingContext } from "lib/react/routing/context"
import { Route } from "react-router-dom"
const languageCodes = [`en`, `es`]
const clients = { foo: `Foo`, bar: `Bar`, baz: `Baz` }
function Icon (props) {
  return props.t({
    en: () => <CommuteIcon />,
    es: () => <WorkIcon />,
  })
}
const baseLinks = [
  {
    clientName: `foo`,
    render: {
      Icon,
      text: { en: () => `English Foo`, es: () => `Spanish Foo` },
    },
  },
  {
    clientName: `bar`,
    render: {
      Icon,
      text: { en: () => `English Bar`, es: () => `Spanish Bar` },
    },
  },
  {
    clientName: `baz`,
    render: {
      Icon,
      text: { en: () => `English Baz`, es: () => `Spanish Baz` },
    },
  },
]
function OpenButton () {
  return (
    <Div>
      <Button
        variant="contained"
        color="primary"
        aria-controls="lib-react-dashboard"
        onClick={useDashboardOpener()}
      >
        Open Dashboard
      </Button>
    </Div>
  )
}
function Example (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    const { mode, languageCode, currentClient } = props.match.params
    languageDetector.set(languageCode)
    return (
      <DarkModeContext.Provider
        value={{
          value: mode === `dark`,
          toggle: () => console.log(`toggle dark mode`),
        }}
      >
        <Theme>
          <CssBaseline />
          <Auth0Context.Provider
            value={{
              login () {
                console.log(`auth0.login`)
              },
              logout () {
                console.log(`auth0.logout`)
              },
            }}
          >
            <RoutingContext.Provider
              value={{
                clientLinks: baseLinks.map(link => {
                  const { clientName } = link
                  return {
                    clientName,
                    active: clientName === currentClient,
                    render: link.render,
                    location: {
                      pathname: `/react/Dashboard/${mode}/${languageCode}/${clientName}`
                    },
                  }
                }),
                translationLinks: { get: () => [] },
              }}
            >
              <Dashboard>
                <OpenButton />
                <Div>{clients[currentClient]}</Div>
              </Dashboard>
            </RoutingContext.Provider>
          </Auth0Context.Provider>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (
  <Route exact path="/react/Dashboard/:mode/:languageCode/:currentClient" component={Example} />
)