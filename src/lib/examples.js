import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch } from "react-router-dom"
import throwPropTypeErrors from "lib/throwPropTypeErrors/example"
import languageDetector from "lib/languageDetector/example"
import routing from "lib/routing/example"
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      {throwPropTypeErrors}
      {languageDetector}
      {routing}
    </Switch>
  </BrowserRouter>
), document.getElementById(`root`))