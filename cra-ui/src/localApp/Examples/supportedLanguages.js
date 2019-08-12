import React from "react"
import { Route } from "react-router-dom"
import supportedLanguages from "local/supportedLanguages"
const text = supportedLanguages.join(` `)
export default (
  <Route
    exact path="/examples/supportedLanguages"
    render={() => <div id="supportedLanguages">{text}</div>}
  />
)