import React from "react"
import Logo from "./index.js"
import { Route } from "react-router-dom"
const label = `Lucas Montenegro logo`
function Example () {
  return (
    <div>
      <div><Logo width="16" height="16" aria-label={label} /></div>
      <div><Logo width="24" height="24" aria-label={label} /></div>
      <div><Logo width="32" height="32" aria-label={label} /></div>
      <div><Logo width="64" height="64" aria-label={label} /></div>
      <div><Logo aria-label={label} /></div>
    </div>
  )
}
export default (<Route exact path="/react/Logo" component={Example} />)