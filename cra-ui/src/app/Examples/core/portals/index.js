import React from "react"
import { Route, Switch } from "react-router-dom"
import main from "./main"
import makeUniqueRef from "./makeUniqueRef"
export default (
  <Route
    path="/examples/core/portals"
    render={() => <Switch>{main}{makeUniqueRef}</Switch>}
  />
)