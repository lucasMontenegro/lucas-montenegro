import React from "react"
import { Switch, Route } from "react-router-dom"
import links from "./links"
import drawer from "./drawer"
import useViewState from "./useViewState"
import navLink from "./navLink"
import portals from "./portals"
import makeRouter from "./makeRouter"
import handleRedirect from "./handleRedirect"
import languageDialog from "./languageDialog"
import makeLanguageDialogState from "./makeLanguageDialogState"
import body from "./body"
import integrated from "./integrated"
import makeClientLocation from "./makeClientLocation"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {drawer}
      {useViewState}
      {navLink}
      {portals}
      {makeRouter}
      {handleRedirect}
      {languageDialog}
      {makeLanguageDialogState}
      {body}
      {integrated}
      {makeClientLocation}
    </Switch>
  )
}
export default (<Route path="/examples/core" component={CoreExamples} />)