import React from "react"
import { withStyles } from "@material-ui/core/styles"
export default withStyles({
  root: {
    display: `block`,
  },
})(React.forwardRef(function BareLi ({ classes, ...other }, ref) {
  return <li {...other} ref={ref} className={classes.root} />
}))