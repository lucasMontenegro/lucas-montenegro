import React from "react"
import { NavLink as RouterNavLink, Link as RouterLink } from "react-router-dom"
import clone from "lodash/clone"
import MuiLink from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
import MenuItem from "@material-ui/core/MenuItem"
export class ListItemLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <li>
      <RouterLink
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
export class Link extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink
      {...itemProps}
      to={this.props.to}
      innerRef={ref}
    />
  ))
  render() {
    const props = clone(this.props)
    props.component = this.WrappedLink
    delete props.to
    return <MuiLink {...props} />
  }
}
export class ButtonLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <RouterLink
      {...itemProps}
      to={this.props.to}
      innerRef={ref}
    />
  ))
  render() {
    const props = clone(this.props)
    props.component = this.WrappedLink
    delete props.to
    return <Button {...props} />
  }
}
export class NavListItemLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <li>
      <RouterNavLink
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
export class MenuItemLink extends React.Component {
  WrappedLink = React.forwardRef((itemProps, ref) => (
    <li>
      <RouterLink
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
    return <MenuItem {...props} />
  }
}