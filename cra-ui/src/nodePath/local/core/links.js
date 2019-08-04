import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import MuiButton from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
const ForwardRouterLinkRef = withStyles({
  root: {
    color: `inherit`,
    textDecoration: `inherit`,
    pointer: `inherit`,
  },
})(React.forwardRef(function ForwardRouterLinkRef (props, ref) {
  const { classes, className: classNameProp, ...other } = props
  const className = classNameProp ? `${classes.root} ${classNameProp}` : classes.root
  return <RouterLink {...other} className={className} innerRef={ref} />
}))
function RenderRouterLink ({ Component, to, href, innerRef, ...other }) {
  return (
    <Component
      {...other}
      href={href}
      to={href ? undefined : to}
      component={href ? `a` : ForwardRouterLinkRef}
      ref={innerRef}
    />
  )
}
export const Link = React.forwardRef(function Link (props, ref) {
  return <RenderRouterLink {...props} Component={MuiLink} innerRef={ref} />
})
export const ButtonLink = React.forwardRef(function ButtonLink (props, ref) {
  return <RenderRouterLink {...props} Component={MuiButton} innerRef={ref} />
})
export const ListLink = React.forwardRef(function ListLink ({ classes, ...other }, ref) {
  return <RenderRouterLink {...other} Component={ListItem} innerRef={ref} />
})