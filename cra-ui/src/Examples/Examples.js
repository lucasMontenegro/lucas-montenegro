import React from "react"
import { Switch } from "react-router-dom"
import router from "./router"
import supportedLanguages from "./supportedLanguages"
//import frame from "./frame"
//import mainRouter from "./mainRouter"
const Examples = () => (
  <Switch>
   {router}
   {supportedLanguages}
  </Switch>
)
export default Examples