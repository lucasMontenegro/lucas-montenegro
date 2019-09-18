import React from "react"
import { Switch, Route } from "react-router-dom"
import links from "./links"
import drawer from "./drawer"
import useViewState from "./useViewState"
import navLink from "./navLink"
import portals from "local/core/portals/example"
import makeUniqueRef from "local/core/portals/makeUniqueRef/example"
import makeRouter from "local/core/makeRouter/example"
import handleRedirect from "./handleRedirect"
import languageDialog from "./languageDialog"
import makeLanguageDialogState from "local/core/makeLanguageDialogState/example"
import body from "./body"
import integrated from "./integrated"
import makeClientLocation from "local/core/makeClientLocation/example"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {drawer}
      {useViewState}
      {navLink}
      {portals}
      {makeUniqueRef}
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