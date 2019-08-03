import React from "react"
import ReactDOM from "react-dom"
export default class PortalGun extends React.Component {
  constructor (props) {
    super(props)
    this.portals = props.appNames.reduce((byAppName, key) => {
      if (key in byAppName) {
        if (process.env.NODE_ENV !== `production`) {
          throw Error(`Repeated key (${key}) in "appNames" prop.`)
        }
        return byAppName
      }
      byAppName[key] = props.mountPoints.reduce((byMountPoint, key) => {
        if (key in byMountPoint) {
          if (process.env.NODE_ENV !== `production`) {
            throw Error(`Repeated key (${key}) in "mountPoints" prop.`)
          }
          return byMountPoint
        }
        const div = document.createElement(`div`)
        let savedNode = null
        function RedPortal ({ Component, other: otherProp }, ref) {
          function refHandler (node) {
            typeof ref === 'function' ? ref(node) : (ref !== null && (ref.current = node))
            node ? node.appendChild(div) : (savedNode && savedNode.removeChild(div))
            savedNode = node
          }
          const other = otherProp || {}
          return <Component {...other} ref={refHandler} />
        }
        byMountPoint[key] = {
          BluePortal ({ children }) {
            return ReactDOM.createPortal(children, div)
          },
          RedPortal: React.forwardRef(RedPortal),
        }
        return byMountPoint
      }, {})
      return byAppName
    }, {})
  }
  render () {
    const { Component, other: otherProp } = this.props
    const other = otherProp || {}
    return <Component {...other} portals={this.portals} />
  }
}