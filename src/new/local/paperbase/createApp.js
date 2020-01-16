import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import darkTheme from "new/local/paperbase/themes/dark"
import makeRouter from "new/local/paperbase/makeRouter"
import HandleRedirect from "new/local/paperbase/HandleRedirect"
import useViewState from "new/local/paperbase/useViewState"
import Drawer from "new/local/paperbase/Drawer"
import { createRedPortal } from "new/local/paperbase/portals"
import BareLi from "new/local/paperbase/BareLi"
import makeLocationPropType from "new/local/paperbase/propTypes/makeLocationPropType"
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