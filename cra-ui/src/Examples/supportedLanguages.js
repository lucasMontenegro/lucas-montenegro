import React from "react"
import { Route } from "react-router-dom"
import supportedLanguages from "local/supportedLanguages"
const text = supportedLanguages.join(` `)
const route = (
  <Route
    exact path="/examples/supportedLanguages"
    render={() => (
      <div id="supportedLanguages">{text}</div>
    )}
  />
)
export default route