import "./index.js"
import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"
function Throw (props) {
  return <div id="throw">{props.value}</div>
}
Throw.propTypes = {
  value: PropTypes.oneOf([`nope`]).isRequired, // make it fail
}
function Example (props) {
  return <Throw value={props.match.params.value} />
}
export default (<Route exact path="/react/throwPropTypeErrors/:value" component={Example} />)