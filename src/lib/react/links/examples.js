import React from "react"
import Div from "lib/react/utils/Div"
import Link from "./Link"
import { Route, Switch } from "react-router-dom"
function Target () {
  return <Div color="Indigo"><h4 id="message">It Works</h4></Div>
}
function Links () {
  return (
    <Div color="RoyalBlue">
      <h4>Link Examples</h4>
      <ul>
        <li><Link to="/react/links/target">Link</Link></li>
      </ul>
    </Div>
  )
}
function Examples () {
  return (
    <Switch>
      <Route exact path="/react/links/target" component={Target} />
      <Route exact path="/react/links" component={Links} />
    </Switch>
  )
}
export default (<Route path="/react/links" component={Examples} />)