import React from "react"
import { Switch } from "react-router-dom"
import router from "./router"
import supportedLanguages from "./supportedLanguages"
import links from "./links"
import portals from "./portals"
import languageMenu from "./languageMenu"
const Examples = () => (
  <Switch>
   {router}
   {supportedLanguages}
   {links}
   {portals}
   {languageMenu}
  </Switch>
)
export default Examples