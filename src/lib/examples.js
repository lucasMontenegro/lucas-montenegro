import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch } from "react-router-dom"
import throwPropTypeErrors from "lib/throwPropTypeErrors/example"
import useUniqueInstance from "lib/useUniqueInstance/example"
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      {throwPropTypeErrors}
      {useUniqueInstance}
    </Switch>
  </BrowserRouter>
), document.getElementById(`root`))