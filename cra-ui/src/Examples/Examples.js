import React from "react"
import { Switch } from "react-router-dom"
import router from "./router"
import supportedLanguages from "./supportedLanguages"
import links from "./links"
//import frame from "./frame"
//import mainRouter from "./mainRouter"
const Examples = () => (
  <Switch>
   {router}
   {supportedLanguages}
   {links}
  </Switch>
)
export default Examples