import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch } from "react-router-dom"
import throwPropTypeErrors from "lib/throwPropTypeErrors/example"
import languageDetector from "lib/languageDetector/example"
import routing from "lib/routing/example"
import paperbase from "lib/paperbase/examples"
import links from "lib/links/examples"
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      {throwPropTypeErrors}
      {languageDetector}
      {routing}
      {links}
      {paperbase}
    </Switch>
  </BrowserRouter>
), document.getElementById(`root`))