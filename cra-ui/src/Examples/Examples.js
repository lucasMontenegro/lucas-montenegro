import React from "react"
import { Switch } from "react-router-dom"
import frame from "./frame"
import mainRouter from "./mainRouter"
const Examples = () => (
  <Switch>
    {frame}
    {mainRouter}
  </Switch>
)
export default Examples
