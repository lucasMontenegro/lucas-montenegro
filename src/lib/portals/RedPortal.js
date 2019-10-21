import React, { useRef } from "react"
import PropTypes from "prop-types"
import useUniqueName from "lib/useUniqueName"
import useDiv from "lib/portals/useDiv"
const namespace = {}
export default function RedPortal ({ getName, Component, props }) {
  const name = useUniqueName(namespace, getName)
  const div = useDiv(name)
  const savedNode = useRef(null)
  function refHandler (node) {
    node ? node.appendChild(div) : (savedNode.current && savedNode.current.removeChild(div))
    savedNode.current = node
  }
  return name === null ? null : <Component {...(props || {})} ref={refHandler} />
}
RedPortal.propTypes = {
  name: PropTypes.func.isRequired
  Component: PropTypes.elementType.isRequired,
  props: PropTypes.object,
}