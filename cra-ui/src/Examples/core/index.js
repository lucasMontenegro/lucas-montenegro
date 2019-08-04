import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import links from "./links"
import portalGun from "./portalGun"
import drawer from "./drawer"
import router from "./router"
import navButton from "./navButton"
//import languageMenu from "./languageMenu"
//import appPanel from "./appPanel"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {portalGun}
      {drawer}
      <Redirect
        exact path="/examples/core/drawer"
        to="/examples/core/drawer/en/000000"
      />
      {router}
      {navButton}
      <Redirect
        exact path="/examples/core/NavButton"
        to="/examples/core/NavButton/null/null/null"
      />
      {/**}
      {languageMenu}
      <Redirect
        exact path="/examples/core/LanguageMenu"
        to="/examples/core/LanguageMenu/en/0"
      />
      {appPanel}
      <Redirect
        exact path="/examples/core/appPanel"
        to="/examples/core/appPanel/top"
      />
      {/**/}
    </Switch>
  )
}
export default (<Route path="/examples/core" component={CoreExamples} />)