import React from "react"
import { Switch, Route } from "react-router-dom"
import notFoundView from "local/clients/createNotFound/NotFoundView/example"
function ClientsExamples () {
  return (
    <Switch>
      {notFoundView}
    </Switch>
  )
}
export default (<Route path="/examples/clients" component={ClientsExamples} />)