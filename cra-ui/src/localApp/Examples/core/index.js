import React from "react"
import { Switch, Route } from "react-router-dom"
import links from "./links"
import portalGun from "./portalGun"
import router from "./router"
import drawer from "./drawer"
import useViewState from "./useViewState"
import navLink from "./navLink"
import makeAppLocation from "./makeAppLocation"
import portals from "./portals"
import makeRouter from "./makeRouter"
import handleRedirect from "./handleRedirect"
import languageDialogView from "./languageDialogView"
import makeLanguageDialogState from "./makeLanguageDialogState"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {portalGun}
      {router}
      {drawer}
      {useViewState}
      {navLink}
      {makeAppLocation}
      {portals}
      {makeRouter}
      {handleRedirect}
      {languageDialogView}
      {makeLanguageDialogState}
    </Switch>
  )
}
export default (<Route path="/examples/core" component={CoreExamples} />)