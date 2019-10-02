import React from "react"
import { Route, Switch } from "react-router-dom"
import HandleRedirect from "local/core/HandleRedirect"
function HandleRedirectExampleRouter () {
  return (
    <Switch>
      <Route
        exact path="/examples/core/HandleRedirect/main/:type"
        component={HandleRedirectExample}
      />
      <Route
        exact path="/examples/core/HandleRedirect/target"
        component={HandleRedirectExampleTarget}
      />
    </Switch>
  )
}
export default (
  <Route path="/examples/core/HandleRedirect" component={HandleRedirectExampleRouter} />
)
function HandleRedirectExample (props) {
  const { type } = props.match.params
  return (
    <HandleRedirect
      match={{
        type,
        languageCode: `en`,
        location: { pathname: `/examples/core/HandleRedirect/target` },
      }}
    >
      <div id="message">did not redirect</div>
    </HandleRedirect>
  )
}
function HandleRedirectExampleTarget () {
  return <div id="message">redirected</div>
}