import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import router from "./router"
import links from "./links"
import languageMenu from "./languageMenu"
import portals from "./portals"
import appButton from "./appButton"
import drawer from "./drawer"
function CoreExamples () {
  return (
    <Switch>
      {links}
      {router}
      {languageMenu}
      <Redirect
        exact path="/examples/core/LanguageMenu"
        to="/examples/core/LanguageMenu/en/0"
      />
      {portals}
      {appButton}
      <Redirect
        exact path="/examples/core/AppButton"
        to="/examples/core/AppButton/null/null/null"
      />
      {drawer}
      <Redirect
        exact path="/examples/core/drawer"
        to="/examples/core/drawer/en/000000"
      />
    </Switch>
  )
}
export default (<Route path="/examples/core" component={CoreExamples} />)