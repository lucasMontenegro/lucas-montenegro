import React from "react"
import { Switch, Route } from "react-router-dom"
import FrameExample from "./FrameExample"
const Examples = () => (
  <Switch>
    <Route path="/examples/frame" component={FrameExample} />
  </Switch>
)
export default Examples
