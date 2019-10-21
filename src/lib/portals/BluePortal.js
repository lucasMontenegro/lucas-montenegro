import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import useUniqueName from "lib/useUniqueName"
import useDiv from "lib/portals/useDiv"
const namespace = {}
export default function BluePortal ({ getName, children }) {
  const name = useUniqueName(namespace, getName)
  const div = useDiv(name)
  return name === null ? null : ReactDOM.createPortal(children, div)
}
BluePortal.propTypes = { children: PropTypes.node }