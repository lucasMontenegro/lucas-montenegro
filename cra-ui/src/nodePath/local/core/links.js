import React from "react"
import { Link as RouterLink } from "react-router-dom"
import MuiLink from "@material-ui/core/Link"
import MuiButton from "@material-ui/core/Button"
import ListItem from "@material-ui/core/ListItem"
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
export const Link = React.forwardRef(function Link (props, ref) {
  return <RenderRouterLink {...props} Component={MuiLink} innerRef={ref} />
})
export const ButtonLink = React.forwardRef(function ButtonLink (props, ref) {
  return <RenderRouterLink {...props} Component={MuiButton} innerRef={ref} />
})
export const ListLink = React.forwardRef(function ListLink (props, ref) {
  return <RenderRouterLink {...props} Component={ListItem} innerRef={ref} />
})