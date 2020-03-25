import React from "react"
import { Route, Switch } from "react-router-dom"
import httpService from "./httpService/example/client"
export default (
  <Route
    path="/profiles"
    render={() => (
      <Switch>
        {httpService}
      </Switch>
    )}
  />
)