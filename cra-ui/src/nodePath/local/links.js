import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import MuiListItem from "@material-ui/core/ListItem"
import MuiButton from "@material-ui/core/Button"
export const Link = withStyles(
  {
    link: {
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  function Link ({ classes, to, href, ...other }) {
    return (
      to ? (
        <RouterLink className={classes.link} to={to}>
          <MuiLink {...other} component="span" />
        </RouterLink>
      ) :
      <MuiLink href={href} {...other} />
    )
  }
)
export const Button = withStyles(
  {
    link: {
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  function Button ({ classes, to, href, ...other }) {
    const content = <MuiButton {...other} />
    return (
      to ? <RouterLink className={classes.link} to={to}>{content}</RouterLink> :
      href ? <a className={classes.link} href={href}>{content}</a> :
      content
    )
  }
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
  function ListItem ({ classes, button, component, to, href, ...other }) {
    const cmp = component || ((to || href) ? `div` : undefined)
    const listItem = <MuiListItem {...other} button={button} component={cmp} />
    const link = (
      to ? <RouterLink className={classes.link} to={to}>{listItem}</RouterLink> :
      href ? <a className={classes.link} href={href}>{listItem}</a> :
      listItem
    )
    return (cmp || button) ? <li>{link}</li> : link
  }
)