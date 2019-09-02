import React from "react"
import { Switch, Route } from "react-router-dom"
import createNotFound from "./createNotFound"
function ClientExamples () {
  return (
    <Switch>
      {createNotFound}
    </Switch>
  )
}
export default (<Route path="/examples/clients" component={ClientExamples} />)