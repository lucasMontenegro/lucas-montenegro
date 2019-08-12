import React from "react"
import { Link as RouterLink } from "react-router-dom"
import MuiLink from "@material-ui/core/Link"
const ForwardRouterLinkRef = React.forwardRef(function ForwardRouterLinkRef (props, ref) {
  return <RouterLink {...props} innerRef={ref} />
})
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
// links are links, buttons are buttons
export const Link = React.forwardRef(function Link (props, ref) {
  return <RenderRouterLink {...props} Component={MuiLink} innerRef={ref} />
})