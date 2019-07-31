import React, { Fragment } from "react"
import ReactDOM from "react-dom"
export function Outlet ({ portals, left, right }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(left, portals.left)}
      {ReactDOM.createPortal(right, portals.right)}
    </Fragment>
  )
}
export class Wiring extends React.Component {
  constructor (props) {
    super(props)
    this.components = props.components.map((Component, n) => ({
      key: n.toString(),
      Component,
      portals: {
        left: document.createElement(`div`),
        right: document.createElement(`div`),
      },
    }))
    this.refHandlers = {
      left: this.makeRefHandler(`left`),
      right: this.makeRefHandler(`right`),
    }
  }
  makeRefHandler (side) {
    const portals = this.components.map(({ portals }) => portals[side])
    let savedNode = null
    return function refHandler (node) {
      if (savedNode) {
        portals.forEach(portal => savedNode.removeChild(portal))
      }
      if (node) {
        portals.forEach(portal => node.appendChild(portal))
      }
      savedNode = node
    }
  }
  render () {
    // es-lint-disable-next-line
    const { Wrapper, components, ...other } = this.props
    return (
      <Fragment>
        <div style={{ display: `none` }}>
          {this.components.map(({ Component, key, portals }) => (
            <Component {...other} key={key} portals={portals} />
          ))}
        </div>
        <Wrapper
          {...other}
          left={<div ref={this.refHandlers.left} />}
          right={<div ref={this.refHandlers.right} />}
        />
      </Fragment>
    )
  }
}