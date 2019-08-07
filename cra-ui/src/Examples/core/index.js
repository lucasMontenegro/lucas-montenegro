import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import links from "./links"
import portalGun from "./portalGun"
import router from "./router"
//import appLocation from "./appLocation"
import languageDialog from "./languageDialog"
import drawer from "./drawer"
import useViewState from "./useViewState"
//import appPanel from "./appPanel"
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
      {/**}
      {appLocation}
      <Redirect
        exact path="/examples/core/AppLocation"
        to="/examples/core/AppLocation/null/null/null"
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