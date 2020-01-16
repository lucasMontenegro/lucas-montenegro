import React from "react"
import { Route, Switch } from "react-router-dom"
import ReactRouterLink from "lib/links/ReactRouterLink"
import Div from "lib/utils/react/Div"
function Target () {
  return <Div color="Indigo"><h4 id="message">It Works</h4></Div>
}
function Examples () {
  return (
    <Div color="RoyalBlue">
      <h4>Link Examples</h4>
      <ul>
        <li><ReactRouterLink to="/links/target">ReactRouterLink</ReactRouterLink></li>
      </ul>
    </Div>
  )
}
export default (
  <Route
    path="/links"
    render={() => (
      <Switch>
        <Route exact path="/links/target" component={Target} />
        <Route exact path="/links" component={Examples} />
      </Switch>
    )}
  />
)