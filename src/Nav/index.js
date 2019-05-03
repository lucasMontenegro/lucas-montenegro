import React, { Fragment } from "react"
import { NavLink, Link } from "react-router-dom"
import clone from "lodash/clone"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import navLinks from "./navLinks"

const navLinksArray = Object.keys(navLinks).map(key => ({
  ...navLinks[key],
  key,
}))

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

const Nav = ({ other: { language, location, languageLinks } }) => {
  return (
    <Fragment>
      <List>
        {navLinksArray.map(link => {
          const locale = link.locales[language]
          return (
            <ListItemNavLink
              key={link.key}
              selected={locale.isActive(location)}
              to={locale.to}
            >
              <ListItemIcon>{locale.icon}</ListItemIcon>
              <ListItemText primary={locale.text} />
            </ListItemNavLink>
          )
        })}
      </List>
      <List>
        {languageLinks.map(link => (
          <ListItemConnectedLink key={link.key} to={link.location}>
            <ListItemText primary={link.text} />
          </ListItemConnectedLink>
        ))}
      </List>
    </Fragment>
  )
}

export default Nav
