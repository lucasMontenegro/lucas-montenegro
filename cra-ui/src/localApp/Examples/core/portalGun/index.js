import React from "react"
import { Switch, Route } from "react-router-dom"
import example1 from "./example1"
import example2 from "./example2"
export default (
  <Route
    path="/examples/core/portalGun"
    render={() => <Switch>{example1}{example2}</Switch>}
  />
)