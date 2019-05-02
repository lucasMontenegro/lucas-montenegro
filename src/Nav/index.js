import React from "react"
import { NavLink } from "react-router-dom"
import clone from "lodash/clone"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import locales from "./locales"

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

const Nav = ({ language, location }) => {
  const { home } = locales[language]
  return (
    <List>
      <ListItemNavLink button key="home" selected={home.isActive(location)} to={home.to}>
        <ListItemIcon>{home.icon}</ListItemIcon>
        <ListItemText primary={home.text} />
      </ListItemNavLink>
    </List>
  )
}

export default Nav
