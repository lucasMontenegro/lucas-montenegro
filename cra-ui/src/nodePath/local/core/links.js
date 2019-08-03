import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import MuiLink from "@material-ui/core/Link"
import MuiButton from "@material-ui/core/Button"
const ForwardRouterLinkRef = React.forwardRef(function ForwardRouterLinkRef (other, ref) {
  return <RouterLink {...other} innerRef={ref} />
})
function RenderRouterLink ({ Component, to, href, innerRef, ...other }) {
  return (
    <Component
      {...other}
      href={href}
      to={href ? undefined : to}
      component={href ? undefined : ForwardRouterLinkRef}
      ref={innerRef}
    />
  )
}
export const Link = React.forwardRef(function Link (props, ref) {
  return <RenderRouterLink {...props} Component={MuiLink} innerRef={ref} />
})
const BlockButton = withStyles({
  root: {
    display: `flex`,
  },
  label: {
    justifyContent: `flex-start`,
  },
})(MuiButton)
export const BlockLink = React.forwardRef(function BlockLink (props, ref) {
  return <RenderRouterLink {...props} Component={BlockButton} innerRef={ref} />
})