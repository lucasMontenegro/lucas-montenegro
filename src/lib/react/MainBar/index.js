import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import useResponsiveLayout from "lib/react/useResponsiveLayout"
import TabletDrawer from "./TabletDrawer"
import MobileBar from "./MobileBar"
import PropTypes from "prop-types"
const useStyles = makeStyles(theme => ({
  responsivePadding: {
    paddingLeft: 0,
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up(`sm`)]: {
      paddingLeft: theme.spacing(10) + 1,
      paddingBottom: 0,
    },
    [theme.breakpoints.up(`md`)]: {
      paddingLeft: 0,
    },
  },
}), { name: `lib-react-main_bar` })
export default function MainBar (props) {
  const classes = useStyles()
  return (
    <div className={classes.responsivePadding}>
      {useResponsiveLayout()({
        tablet: () => <TabletDrawer />,
        mobile: () => props.hideMobile ? null : <MobileBar />,
      })}
      {props.children}
    </div>
  )
}
MainBar.propTypes = {
  children: PropTypes.node,
  hideMobile: PropTypes.bool,
}