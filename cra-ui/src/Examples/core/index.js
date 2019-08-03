import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import links from "./links"
import PortalGun from "./PortalGun"
import drawer from "./drawer"
//import router from "./router"
//import languageMenu from "./languageMenu"
//import appButton from "./appButton"
//import appPanel from "./appPanel"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {PortalGun}
      {drawer}
      <Redirect
        exact path="/examples/core/drawer"
        to="/examples/core/drawer/en/000000"
      />
      {/**}
      {router}
      {languageMenu}
      <Redirect
        exact path="/examples/core/LanguageMenu"
        to="/examples/core/LanguageMenu/en/0"
      />
      {appButton}
      <Redirect
        exact path="/examples/core/AppButton"
        to="/examples/core/AppButton/null/null/null"
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