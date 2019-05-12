import React from "react"
import { NavLink, Link } from "react-router-dom"
import clone from "lodash/clone"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

class ListItemConnectedLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <li>
      <Link
        {...itemProps}
        to={this.props.to}
        innerRef={ref}
      />
    </li>
  ))
  render() {
    const props = clone(this.props)
    props.component = this.WrappedLink
    props.button = true
    delete props.to
    return <ListItem {...props} />
  }
}

const ListLink = ({ to, text }) => (
  <ListItemConnectedLink to={to}>
    <ListItemText primary={text} />
  </ListItemConnectedLink>
)

class ListItemNavLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <li>
      <NavLink
        {...itemProps}
        exact={this.props.exact}
        to={this.props.to}
        innerRef={ref}
      />
    </li>
  ))
  render() {
    const props = clone(this.props)
    props.component = this.WrappedLink
    props.button = true
    delete props.to
    delete props.exact
    return <ListItem {...props} />
  }
}

const ListNavLink = ({ to, text, icon, selected }) => (
  <ListItemNavLink selected={selected} to={to}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemNavLink>
)

export { List, ListNavLink, ListLink }
