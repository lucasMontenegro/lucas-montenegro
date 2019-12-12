import React from "react"
import { Route, Switch } from "react-router-dom"
import DarkMode from "./DarkMode/example"
export default (
  <Route
    path="/react"
    render={() => (
      <Switch>
        {DarkMode}
      </Switch>
    )}
  />
)