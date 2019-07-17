import React from "react"
import { Route, Switch } from "react-router-dom"
import FrameExample1 from "./FrameExample1"
function FrameExampleRoutes () {
  return (
    <Switch>
      <Route
        key="example1"
        exact path="/examples/frame/example1/:languageCode"
        component={FrameExample1}
      />
    </Switch>
  )
}
const frameExample = <Route key="frame" path="/examples/frame" component={FrameExampleRoutes} />
export default frameExample