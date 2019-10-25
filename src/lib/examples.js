import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch } from "react-router-dom"
import throwPropTypeErrors from "lib/throwPropTypeErrors/example"
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      {throwPropTypeErrors}
    </Switch>
  </BrowserRouter>
), document.getElementById(`root`))