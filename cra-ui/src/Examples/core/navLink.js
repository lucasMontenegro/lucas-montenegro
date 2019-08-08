import React, { Fragment } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import WorkIcon from "@material-ui/icons/Work"
import supportedLanguages from "local/supportedLanguages"
import NavLink from "local/core/NavLink"
import BareLi from "local/core/BareLi"
import theme from "local/darkTheme"
import makeTranslation from "local/makeTranslation"
function NavLinkExampleRouter () {
  return (
    <Switch>
      <Redirect exact path="/examples/core/NavLink" to="/examples/core/NavLink/example" />
      <Route exact path="/examples/core/NavLink/target" component={NavLinkExampleTarget} />
      <Route exact path="/examples/core/NavLink/example" component={NavLinkExample} />
    </Switch>
  )
}
export default (<Route path="/examples/core/NavLink" component={NavLinkExampleRouter} />)
function NavLinkExampleTarget () {
  return <div id="message">it works</div>
}
const labels = makeTranslation(languageCode => `nav link ${languageCode}`)
const icons = makeTranslation(languageCode => <WorkIcon className={`nav-icon-${languageCode}`} />)
function NavLinkExample () {
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" style={{ width: 320 }}>
        <List disablePadding>
          {[`true`, `false`].map(active => (
            <Fragment key={active}>
              {supportedLanguages.map(languageCode => {
                const id = `li-${active}-${languageCode}`
                return (
                  <BareLi key={id} id={id}>
                    <NavLink
                      linkId={`nav-link-${active}-${languageCode}`}
                      active={active === `true`}
                      languageCode={languageCode}
                      location="/examples/core/NavLink/target"
                      labels={labels}
                      icons={icons}
                    />
                  </BareLi>
                )
              })}
            </Fragment>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  )
}