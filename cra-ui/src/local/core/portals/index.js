import React from "react"
import ReactDOM from "react-dom"
import makeUniqueRef from "./makeUniqueRef"
const checkName = (namespace => function checkName (name) {
  if (name in namespace) {
    throw Error(`${name}: Repeated name in portals namespace`)
  }
  namespace[name] = null
})({})
const getDiv = (namespace => function getDiv (name) {
  return namespace[name] || (namespace[name] = document.createElement(`div`))
})({})
export function makeRedPortal (name) {
  const fullName = `${name} > RedPortal`
  checkName(fullName)
  const useUniqueRef = makeUniqueRef(fullName)
  const div = getDiv(name)
  let savedNode = null
  function portalRefHandler (node) {
    node ? node.appendChild(div) : (savedNode && savedNode.removeChild(div))
    savedNode = node
  }
  return function RedPortal ({ Component, props }) {
    const unique = useUniqueRef()
    const other = props || {}
    return unique ? <Component {...other} ref={portalRefHandler} /> : null
  }
}
export function makeBluePortal (name) {
  const fullName = `${name} > BluePortal`
  checkName(fullName)
  const useUniqueRef = makeUniqueRef(fullName)
  const div = getDiv(name)
  return function BluePortal ({ children }) {
    const unique = useUniqueRef()
    return unique ? ReactDOM.createPortal(children, div) : null
  }
}