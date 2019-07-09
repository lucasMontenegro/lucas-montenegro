import React from "react"
import theme from "local/theme"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import MuiDrawer from "@material-ui/core/Drawer"
import MenuSlider from "./MenuSlider"
const leftWidth = `256px`
const drawerColor =`rgba(255, 255, 255, 0.7)`
const drawerBgColor = `#18202c`
const breakpointUp = theme.breakpoints.up(800)
const useStyles = makeStyles({
  paper: {
    outline: `none`,
    display: `flex`,
    backgroundColor: drawerBgColor,
  },
  slider: {
    height: `100vh`,
    flex: `0 0 4ch`,
  },
  children: {
    color: drawerColor,
    backgroundColor: drawerBgColor,
    height: `100vh`,
    flex: `0 1 100%`,
    overflowY: `auto`,
    WebkitOverflowScrolling: `touch`, // Add iOS momentum scrolling.
  },
})
function Drawer (props) {
  const classes = useStyles(props)
  const hidden = useMediaQuery(breakpointUp)
  if (hidden) {
    return null
  }
  return (
    <MuiDrawer
      PaperProps={{
        className: classes.paper,
        style: { width: leftWidth },
      }}
      variant="temporary"
      open={props.open}
      onClose={props.onClose}
    >
      <MenuSlider
        {...props.sliderProps}
        id="top-slider"
        className={classes.slider}
      />
      <div className={classes.children}>{props.children}</div>
    </MuiDrawer>
  )
}
export default Drawer