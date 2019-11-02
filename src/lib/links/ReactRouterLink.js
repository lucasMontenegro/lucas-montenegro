import React from "react"
import { Link } from "react-router-dom"
import MuiLink from "@material-ui/core/Link"
const ForwardReactRouterLinkRef = React.forwardRef(
  function ForwardReactRouterLinkRef (props, ref) {
    return <Link {...props} innerRef={ref} />
  }
)
export default function ReactRouterLink (props) {
  return <MuiLink {...props} component={ForwardReactRouterLinkRef} />
}