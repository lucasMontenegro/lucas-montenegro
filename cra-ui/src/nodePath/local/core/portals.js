import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import ReactDOM from "react-dom"
export function Outlet ({ portals, left, right }) {
  return (
    <Fragment>
      {ReactDOM.createPortal(left, portals.left)}
      {ReactDOM.createPortal(right, portals.right)}
    </Fragment>
  )
}
export const Wiring = withStyles(
  {
    root: {
      display: `none`,
    },
    ul: {
      listStyle: `none`,
      margin: 0,
      padding: 0,
      "& > li": {
        display: `block`,
      },
    },
  }
)(
  class Wiring extends React.Component {
    constructor (props) {
      super(props)
      this.components = props.components.map((Component, n) => ({
        key: n.toString(),
        Component,
        portals: {
          left: document.createElement(`li`),
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
      const { Wrapper, components, classes, ...other } = this.props
      return (
        <Fragment>
          <div className={classes.root}>
            {this.components.map(({ Component, key, portals }) => (
              <Component {...other} key={key} portals={portals} />
            ))}
          </div>
          <Wrapper
            {...other}
            left={<ul className={classes.ul} ref={this.refHandlers.left} />}
            right={<div ref={this.refHandlers.right} />}
          />
        </Fragment>
      )
    }
  }
)