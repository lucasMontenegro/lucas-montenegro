import React from "react"
import { Switch, Route } from "react-router-dom"
import Frame from "./Frame"

const Examples = () => (
  <Switch>
    <Route exact path="/examples/frame" component={Frame} />
  </Switch>
)

export default Examples
