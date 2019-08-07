import React, { Fragment } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import WorkIcon from "@material-ui/icons/Work"
import supportedLanguages from "local/supportedLanguages"
import NavLink from "local/core/NavLink"
import theme from "local/darkTheme"
function NavLinkExampleRouter () {
  return (
    <Switch>
      <Redirect exact path="/examples/core/navLink" to="/examples/core/navLink/example" />
      <Route exact path="/examples/core/navLink/target" component={NavLinkExampleTarget} />
      <Route exact path="/examples/core/navLink/example" component={NavLinkExample} />
    </Switch>
  )
}
export default (<Route path="/examples/core/navLink" component={NavLinkExampleRouter} />)
function NavLinkExampleTarget () {
  return <div id="message">it works</div>
}
const labels = supportedLanguages.reduce((labels, languageCode) => {
  labels[languageCode] = `nav link ${languageCode}`
  return labels
}, {})
const icons = supportedLanguages.reduce((icons, languageCode) => {
  icons[languageCode] = <WorkIcon aria-label={`nav icon ${languageCode}`} />
  return icons
}, {})
function NavLinkExample () {
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" style={{ width: 320 }}>
        <List disablePadding>
          {[`true`, `false`].map(active => (
            <Fragment key={active}>
              {supportedLanguages.map(languageCode => {
                const id = `nav-link-${active}-${languageCode}`
                return (
                  <NavLink
                    key={id}
                    id={id}
                    active={active === `true`}
                    languageCode={languageCode}
                    location="/examples/core/navLink/target"
                    labels={labels}
                    icons={icons}
                  />
                )
              })}
            </Fragment>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  )
}