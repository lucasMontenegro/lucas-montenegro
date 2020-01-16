import React from "react"
import { Link as RouterLink } from "react-router-dom"
import MuiLink from "@material-ui/core/Link"
import PropTypes from "prop-types"
import makeLocationPropType from "new/local/paperbase/propTypes/makeLocationPropType"
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
RenderRouterLink.propTypes = {
  Component: PropTypes.elementType.isRequired,
  to: makeLocationPropType(),
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType.isRequired }),
  ]),
}
// links are links, buttons are buttons
export const Link = React.forwardRef(function Link (props, ref) {
  return <RenderRouterLink {...props} Component={MuiLink} innerRef={ref} />
})