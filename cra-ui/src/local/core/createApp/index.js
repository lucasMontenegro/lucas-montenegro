import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import darkTheme from "local/darkTheme"
import makeRouter from "local/core/makeRouter"
import HandleRedirect from "local/core/HandleRedirect"
import useViewState from "local/core/useViewState"
import Drawer from "local/core/Drawer"
import { makeRedPortal } from "local/core/portals"
import BareLi from "local/core/BareLi"
const mobileBreakpoint = 100
const drawerWidth = 256
const namespace = {}
export default function createApp (options) {
  const {
    name,
    clients,
    routing,
    title,
  } = options
  if (name in namespace) {
    throw Error(`Duplicated App name: ${name}`)
  }
  namespace[name] = null
  const clientNames = Object.keys(clients)
  const appLinks = clientNames.map(clientName => ({
    key: clientName,
    RedPortal: makeRedPortal(`${name} > ${clientName} > AppLink`),
  }))
  const drawerContent = clientNames.map(clientName => ({
    key: clientName,
    RedPortal: makeRedPortal(`${name} > ${clientName} > DrawerContent`),
  }))
  const clientsArray = clientNames.map(key => ({ key, Client: clients[key] }))
  const useRouter = makeRouter(routing)
  return function App ({ location }) {
    const match = useRouter(location)
    const viewState = useViewState(mobileBreakpoint)
    return (
      <HandleRedirect match={match}>
        {clientsArray.map(({ key, Client }) => (
          <Client
            key={key}
            match={match}
            viewState={viewState}
            drawerWidth={drawerWidth}
            title={title}
            location={location}
          />
        ))}
        <ThemeProvider theme={darkTheme}>
          <Drawer
            languageCode={match.languageCode}
            width={drawerWidth}
            viewState={viewState}
            navLinks={appLinks.map(({ key, RedPortal }) => (
              <RedPortal key={key} Component={BareLi} />
            ))}
          >
            {drawerContent.map(({ key, RedPortal }) => <RedPortal key={key} Component="div" />)}
          </Drawer>
        </ThemeProvider>
      </HandleRedirect>
    )
  }
}