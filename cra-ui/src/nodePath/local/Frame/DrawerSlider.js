import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/lab/Slider"
import Paper from "@material-ui/core/Paper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MenuIcon from "@material-ui/icons/Menu"
import translations from "./translations"
const iconOpacity = 0.5
const StyledSlider = withStyles(
  {
    root: {
      flex: `0 0 50%`,
      color: `white`,
    },
    thumb: {
      backgroundColor: '#fff',
      border: '2px solid currentColor',
    },
  }
)(Slider)
const DrawerSlider = withStyles(
  {
    root: {
      zIndex: 5,
      backgroundColor: `#18202c`,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      justifyContent: `center`,
    },
    icon: {
      color: `white`,
      flex: `0 0 1em`,
    },
  }
)(
  function DrawerSlider (props) {
    const { classes, id, value } = props
    const { drawerSliderLabel } = translations[props.languageCode]
    const children = (
      <Fragment>
        <div className={classes.icon} style={{ opacity: value === 2 ? 1 : iconOpacity }}>
          <FontAwesomeIcon icon={[`fas`, `thumbtack`]} />
        </div>
        <div className={classes.icon} style={{ opacity: value > 0 ? 1 : iconOpacity }}>
          <MenuIcon />
        </div>
        <StyledSlider
          orientation="vertical"
          step={1}
          max={2}
          aria-label={drawerSliderLabel}
          aria-controls="drawer"
          value={value}
          onChange={props.onChange}
          onChangeCommitted={props.onChangeCommitted}
        />
      </Fragment>
    )
    const fullClassName = `${props.className} ${classes.root}`
    if (props.paper) {
      return <Paper square elevation={4} id={id} className={fullClassName}>{children}</Paper>
    }
    return <div id={id} className={fullClassName}>{children}</div>
  }
)
export default DrawerSlider