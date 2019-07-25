import React from "react"
import { Switch } from "react-router-dom"
import router from "./router"
import supportedLanguages from "./supportedLanguages"
import links from "./links"
import portals from "./portals"
const Examples = () => (
  <Switch>
   {router}
   {supportedLanguages}
   {links}
   {portals}
  </Switch>
)
export default Examples