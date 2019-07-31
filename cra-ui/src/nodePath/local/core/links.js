import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
export const Link = withStyles(
  {
    anchor: {
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  function Link ({ classes, to, id, className, ...other }) {
    const anchorClassName = className ? `${className} ${classes.anchor}` : classes.anchor
    return (
      <RouterLink to={to} id={id} className={anchorClassName}>
        <MuiLink {...other} component="span" />
      </RouterLink>
    )
  }
)
export const LinkButton = withStyles(
  {
    anchor: {
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  function LinkButton (props) {
    const { classes, to, id, className, ...other } = props
    const anchorClassName = className ? `${className} ${classes.anchor}` : classes.anchor
    return (
      <RouterLink to={to} id={id} className={anchorClassName}>
        <Button {...other} component="span" />
      </RouterLink>
    )
  }
)
export const BlockLinkButton = withStyles(
  {
    anchor: {
      color: `inherit`,
      textDecoration: `inherit`,
      display: `block`,
    },
    button: {
      display: `block`,
      textAlign: `left`,
    },
  }
)(
  function BlockLinkButton (props) {
    const { classes, to, id, className, ...other } = props
    const anchorClassName = className ? `${className} ${classes.anchor}` : classes.anchor
    return (
      <RouterLink to={to} id={id} className={anchorClassName}>
        <Button {...other} className={classes.button} component="div" />
      </RouterLink>
    )
  }
)
export const MenuLink = withStyles(
  {
    anchor: {
      display: `block`,
      color: `inherit`,
      textDecoration: `inherit`,
    },
  }
)(
  React.forwardRef(function MenuLink (props, ref) {
    const { classes, to, id, className, anchorClassName, ...other } = props
    return (
      <li id={id} className={className}>
        <RouterLink
          to={to}
          className={anchorClassName ? `${anchorClassName} ${classes.anchor}` : classes.anchor}
        >
          <MenuItem {...other} component="div" ref={ref} />
        </RouterLink>
      </li>
    )
  })
)