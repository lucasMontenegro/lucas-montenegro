import React, { useState } from "react"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MainBar from "./index.js"
import Div from "lib/react/utils/Div"
import GetValue from "lib/react/utils/GetValue"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { RoutingContext } from "lib/react/routing/context"
import { AppDrawerContext } from "lib/react/AppDrawer"
import { Route } from "react-router-dom"
const languageCodes = [`en`, `es`]
const clients = { foo: `Foo`, bar: `Bar`, baz: `Baz` }
const baseLinks = [
  {
    clientName: `foo`,
    render: {
      Icon: props => props.t({
        en: () => <FontAwesomeIcon icon={[`fas`, `dog`]} />,
        es: () => <FontAwesomeIcon icon={[`fas`, `hippo`]} />,
      }),
      text: { en: () => `English Foo`, es: () => `Spanish Foo` },
    },
  },
  {
    clientName: `bar`,
    render: {
      Icon: props => props.t({
        en: () => <FontAwesomeIcon icon={[`fas`, `cat`]} />,
        es: () => <FontAwesomeIcon icon={[`fas`, `crow`]} />,
      }),
      text: { en: () => `English Bar`, es: () => `Spanish Bar` },
    },
  },
  {
    clientName: `baz`,
    render: {
      Icon: props => props.t({
        en: () => <FontAwesomeIcon icon={[`fas`, `horse`]} />,
        es: () => <FontAwesomeIcon icon={[`fas`, `frog`]} />,
      }),
      text: { en: () => `English Baz`, es: () => `Spanish Baz` },
    },
  },
]
const useStyles = makeStyles(theme => ({
  padding: {
    [theme.breakpoints.up(`sm`)]: {
      paddingTop: 64,
    },
    [theme.breakpoints.up(`md`)]: {
      paddingLeft: 256,
    },
  },
  appBar: {
    top: `auto`,
    right: 0,
    bottom: 0,
    left: `auto`,
    width: `100vw`,
    [theme.breakpoints.up(`sm`)]: {
      top: 0,
      bottom: `auto`,
      width: `calc(100vw - ${theme.spacing(10) + 1}px)`,
    },
    [theme.breakpoints.up(`md`)]: {
      width: `calc(100vw - ${theme.spacing(32) + 1}px)`,
    },
  },
}), { name: `lib-react-main_bar-example` })
function CustomBar (props) {
  const classes = useStyles()
  return (
    <div className={classes.padding}>
      {props.show && (
        <AppBar className={classes.appBar}>
          <Toolbar><Typography>Custom Bar</Typography></Toolbar>
        </AppBar>
      )}
      {props.children}
    </div>
  )
}
function Client (props) {
  const [isBarShown, showBar] = useState(false)
  return (
    <MainBar hideMobile={isBarShown}>
      <CustomBar show={isBarShown}>
        <Div>{clients[props.name]}</Div>
        <GetValue
          id="show-custom-bar"
          value={isBarShown}
          onClick={() => showBar(!isBarShown)}
        />
      </CustomBar>
    </MainBar>
  )
}
function Example (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    const { mode, languageCode, currentClient } = props.match.params
    languageDetector.set(languageCode)
    return (
      <DarkModeContext.Provider value={{ value: mode === `dark` }}>
        <Theme>
          <CssBaseline />
          <RoutingContext.Provider
            value={{
              clientLinks: baseLinks.map(link => {
                const { clientName } = link
                return {
                  clientName,
                  active: clientName === currentClient,
                  render: link.render,
                  location: { pathname: `/react/MainBar/${mode}/${languageCode}/${clientName}` },
                }
              }),
            }}
          >
            <AppDrawerContext.Provider value={() => console.log(`Open App drawer`)}>
              <Client name={currentClient} />
            </AppDrawerContext.Provider>
          </RoutingContext.Provider>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (
  <Route exact path="/react/MainBar/:mode/:languageCode/:currentClient" component={Example} />
)