import React from "react"
import { Route } from "react-router-dom"
import PropTypes from "prop-types"
import throwPropTypeErrors from "lib/throwPropTypeErrors"
throwPropTypeErrors()
function ExampleComponent ({ message }) {
  return <div id="message">{message}</div>
}
ExampleComponent.propTypes = {
  message: PropTypes.number.isRequired, // force it to fail
}
export default (
  <Route
    exact path="/throwPropTypeErrors/:message"
    render={props => <ExampleComponent message={props.match.params.message} />}
  />
)