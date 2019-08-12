import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import links from "./links"
import portalGun from "./portalGun"
import router from "./router"
import languageDialog from "./languageDialog"
import drawer from "./drawer"
import useViewState from "./useViewState"
import appLocation from "./appLocation"
import navLink from "./navLink"
import makeAppLocation from "./makeAppLocation"
import portals from "./portals"
//import makeRouter from "./makeRouter"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {portalGun}
      {router}
      {languageDialog}
      <Redirect
        exact path="/examples/core/LanguageDialog"
        to="/examples/core/LanguageDialog/en/0"
      />
      {drawer}
      {useViewState}
      {navLink}
      {appLocation}
      {makeAppLocation}
      {portals}
      {/*makeRouter*/}
    </Switch>
  )
}
export default (<Route path="/examples/core" component={CoreExamples} />)