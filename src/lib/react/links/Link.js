import React from "react"
import { Link as RouterLink } from "react-router-dom"
import MuiLink from "@material-ui/core/Link"
const ForwardLinkRef = React.forwardRef(function ForwardLinkRef (props, ref) {
  return <RouterLink {...props} innerRef={ref} />
})
export default function Link (props) {
  return <MuiLink {...props} component={ForwardLinkRef} />
}