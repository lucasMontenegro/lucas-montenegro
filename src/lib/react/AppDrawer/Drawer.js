import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React, { Fragment } from "react"
import Toolbar from "@material-ui/core/Toolbar"
import CloseButton from "./CloseButton"
import Nav from "./Nav"
import MuiDrawer from "@material-ui/core/Drawer"
import PropTypes from "prop-types"
const desktopBreakpoint = theme => theme.breakpoints.up(`md`)
const useStyles = makeStyles(theme => ({
  flexibleSpace: {
    flex: `0 1 100%`,
  },
  paper: {
    width: theme.spacing(32),
    paddingLeft: 0,
    paddingRight: 0,
  },
  children: {
    [desktopBreakpoint(theme)]: {
      marginLeft: theme.spacing(32),
    },
  },
}), { name: `lib-react-app_drawer` })
export default function Drawer (props) {
  const { onClose } = props
  const classes = useStyles()
  const t = useTranslation()
  const isDesktop = useMediaQuery(desktopBreakpoint)
  const content = (
    <Fragment>
      <Toolbar>
        <div className={classes.flexibleSpace} />
        <CloseButton isDesktop={isDesktop} t={t} onClick={onClose} />
      </Toolbar>
      <Nav t={t} onClick={onClose} windowTitle={props.windowTitle} />
    </Fragment>
  )
  const drawerClasses = { paper: classes.paper }
  const drawer = (
    isDesktop ? <MuiDrawer classes={drawerClasses} variant="permanent">{content}</MuiDrawer> :
    (
      <MuiDrawer
        id="lib-react-app_drawer"
        ModalProps={{ keepMounted: true }}
        classes={drawerClasses}
        variant="temporary"
        open={props.isOpen}
        onClose={onClose}
      >
        {content}
      </MuiDrawer>
    )
  )
  return <div className={classes.children}>{drawer}{props.children}</div>
}
Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}