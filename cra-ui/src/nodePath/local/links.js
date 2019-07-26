import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import MuiListItem from "@material-ui/core/ListItem"
import MuiButton from "@material-ui/core/Button"
import MuiMenuItem from "@material-ui/core/MenuItem"
export const Link = withStyles(
  {
    link: {
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  React.forwardRef(function Link (props, ref) {
    const { classes, to, href, ...other } = props
    return (
      to ? (
        <RouterLink ref={ref} className={classes.link} to={to}>
          <MuiLink {...other} component="span" />
        </RouterLink>
      ) :
      <MuiLink ref={ref} href={href} {...other} />
    )
  })
)
export const Button = withStyles(
  {
    link: {
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  React.forwardRef(function Button (props, ref) {
    const { classes, to, href, ...other } = props
    const content = <MuiButton {...other} ref={ref} />
    return (
      to ? <RouterLink className={classes.link} to={to}>{content}</RouterLink> :
      href ? <a className={classes.link} href={href}>{content}</a> :
      content
    )
  })
)
export const ListItem = withStyles(
  {
    link: {
      display: `block`,
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  React.forwardRef(function ListItem (props, ref) {
    const { classes, button, component, to, href, ...other } = props
    const cmp = component || ((to || href) ? `div` : undefined)
    const listItem = <MuiListItem {...other} ref={ref} button={button} component={cmp} />
    const link = (
      to ? <RouterLink className={classes.link} to={to}>{listItem}</RouterLink> :
      href ? <a className={classes.link} href={href}>{listItem}</a> :
      listItem
    )
    return (cmp || button) ? <li>{link}</li> : link
  })
)
export const MenuItem = withStyles(
  {
    link: {
      display: `block`,
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  React.forwardRef(function MenuItem (props, ref) {
    const { classes, button, component, to, href, ...other } = props
    const cmp = component || ((to || href) ? `div` : undefined)
    const listItem = <MuiMenuItem {...other} ref={ref} button={button} component={cmp} />
    const link = (
      to ? <RouterLink className={classes.link} to={to}>{listItem}</RouterLink> :
      href ? <a className={classes.link} href={href}>{listItem}</a> :
      listItem
    )
    return (cmp || button) ? <li>{link}</li> : link
  })
)