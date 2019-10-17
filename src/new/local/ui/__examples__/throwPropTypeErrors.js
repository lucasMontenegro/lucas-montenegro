import React from "react"
import { Route } from "react-router-dom"
import PropTypes from "prop-types"
function ExampleComponent ({ message }) {
  return <div id="message">{message}</div>
}
ExampleComponent.propTypes = {
  message: PropTypes.number.isRequired, // force it to fail
}
export default (
  <Route
    exact path="/old-examples/throwPropTypeErrors/:message"
    render={props => <ExampleComponent message={props.match.params.message} />}
  />
)