import React from "react"
import { NavLink, Link } from "react-router-dom"
import clone from "lodash/clone"
import ListItem from "@material-ui/core/ListItem"
export class ConnectedListItemLink extends React.Component {
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
export class NavListItemLink extends React.Component {
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
