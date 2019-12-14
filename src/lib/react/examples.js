import React from "react"
import { Route, Switch } from "react-router-dom"
import DarkMode from "./DarkMode/example"
import Logo from "./Logo/example"
import Theme from "./Theme/example"
export default (
  <Route
    path="/react"
    render={() => (
      <Switch>
        {DarkMode}
        {Logo}
        {Theme}
      </Switch>
    )}
  />
)