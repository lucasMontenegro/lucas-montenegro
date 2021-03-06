import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import darkTheme from "local/darkTheme"
import makeRouter from "local/core/makeRouter"
import HandleRedirect from "local/core/HandleRedirect"
import useViewState from "local/core/useViewState"
import Drawer from "local/core/Drawer"
import { createRedPortal } from "local/core/portals"
import BareLi from "local/core/BareLi"
import makeLocationPropType from "local/core/propTypes/makeLocationPropType"
const mobileBreakpoint = 100
const drawerWidth = 256
const namespace = {}
export default function createApp (options) {
  const {
    name,
    clients,
    routing,
    logo,
    titles,
  } = options
  if (name in namespace) {
    throw Error(`Duplicated App name: ${name}`)
  }
  namespace[name] = null
  const clientNames = Object.keys(clients)
  const clientLinks = clientNames.map(clientName => ({
    key: clientName,
    RedPortal: createRedPortal(`${name} > ${clientName} > ClientLink`),
  }))
  const drawerContent = clientNames.map(clientName => ({
    key: clientName,
    RedPortal: createRedPortal(`${name} > ${clientName} > DrawerContent`),
  }))
  const clientsArray = clientNames.map(clientName => ({ clientName, Client: clients[clientName] }))
  const useRouter = makeRouter(routing)
  function App ({ location }) {
    const match = useRouter(location)
    const viewState = useViewState(mobileBreakpoint)
    if (match.type === `initializing`) {
      return null
    }
    const matchClient = match.type === `client`
    return (
      <HandleRedirect match={match}>
        {clientsArray.map(({ clientName, Client }) => (
          <Client
            key={clientName}
            match={matchClient && match.clientName === clientName}
            languageCode={match.languageCode}
            location={location}
            viewState={viewState}
            drawerWidth={drawerWidth}
            logo={logo}
            titles={titles}
          />
        ))}
        <ThemeProvider theme={darkTheme}>
          <Drawer
            languageCode={match.languageCode}
            width={drawerWidth}
            viewState={viewState}
            navLinks={clientLinks.map(({ key, RedPortal }) => (
              <RedPortal key={key} Component={BareLi} />
            ))}
          >
            {drawerContent.map(({ key, RedPortal }) => <RedPortal key={key} Component="div" />)}
          </Drawer>
        </ThemeProvider>
      </HandleRedirect>
    )
  }
  App.propTypes = { location: makeLocationPropType().isRequired }
  return App
}