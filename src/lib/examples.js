import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch } from "react-router-dom"
import throwPropTypeErrors from "lib/throwPropTypeErrors/example"
import languageDetector from "lib/languageDetector/example"
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      {throwPropTypeErrors}
      {languageDetector}
    </Switch>
  </BrowserRouter>
), document.getElementById(`root`))