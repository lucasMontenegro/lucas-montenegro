import React from "react"
import ReactDOM from "react-dom"
import makeUniqueRef from "./makeUniqueRef"
import PropTypes from "prop-types"
const checkName = (namespace => function checkName (name) {
  if (name in namespace) {
    throw Error(`${name}: Repeated name in portals namespace`)
  }
  namespace[name] = null
})({})
const getDiv = (namespace => function getDiv (name) {
  return namespace[name] || (namespace[name] = document.createElement(`div`))
})({})
export function createRedPortal (name) {
  const fullName = `${name} > RedPortal`
  checkName(fullName)
  const useUniqueRef = makeUniqueRef(fullName)
  const div = getDiv(name)
  let savedNode = null
  function portalRefHandler (node) {
    node ? node.appendChild(div) : (savedNode && savedNode.removeChild(div))
    savedNode = node
  }
  function RedPortal ({ Component, props }) {
    const unique = useUniqueRef()
    const other = props || {}
    return unique ? <Component {...other} ref={portalRefHandler} /> : null
  }
  RedPortal.propTypes = {
    Component: PropTypes.elementType.isRequired,
    props: PropTypes.object,
  }
  return RedPortal
}
export function createBluePortal (name) {
  const fullName = `${name} > BluePortal`
  checkName(fullName)
  const useUniqueRef = makeUniqueRef(fullName)
  const div = getDiv(name)
  function BluePortal ({ children }) {
    const unique = useUniqueRef()
    return unique ? ReactDOM.createPortal(children, div) : null
  }
  BluePortal.propTypes = { children: PropTypes.node }
  return BluePortal
}