import React from "react"
import { Switch, Route } from "react-router-dom"
import links from "local/core/links/example"
import drawer from "local/core/Drawer/example"
import useViewState from "./useViewState"
import navLink from "./navLink"
import portals from "local/core/portals/example"
import makeUniqueRef from "local/core/portals/makeUniqueRef/example"
import makeRouter from "local/core/makeRouter/example"
import handleRedirect from "local/core/HandleRedirect/example"
import languageDialog from "local/core/LanguageDialog/example"
import makeLanguageDialogState from "local/core/makeLanguageDialogState/example"
import body from "local/core/Body/example"
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