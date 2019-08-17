import React from "react"
import { Switch, Route } from "react-router-dom"
import links from "./links"
import drawer from "./drawer"
import useViewState from "./useViewState"
import navLink from "./navLink"
import makeAppLocation from "./makeAppLocation"
import portals from "./portals"
import makeRouter from "./makeRouter"
import handleRedirect from "./handleRedirect"
import languageDialog from "./languageDialog"
import makeLanguageDialogState from "./makeLanguageDialogState"
import body from "./body"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {drawer}
      {useViewState}
      {navLink}
      {makeAppLocation}
      {portals}
      {makeRouter}
      {handleRedirect}
      {languageDialog}
      {makeLanguageDialogState}
      {body}
    </Switch>
  )
}
export default (<Route path="/examples/core" component={CoreExamples} />)