import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React, { Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import CloseButton from "./CloseButton"
import Settings from "lib/react/Settings"
import SettingsButton from "./SettingsButton"
import Nav from "./Nav"
import MuiDrawer from "@material-ui/core/Drawer"
const desktopBreakpoint = theme => theme.breakpoints.up(`md`)
const useStyles = makeStyles(theme => ({
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.type === `dark` ? `#1d1d1ded` : `#ffffffed`,
    width: theme.spacing(32),
    left: 0,
    right: `auto`,
    paddingRight: `0px !important`,
  },
  toolbar: {
    justifyContent: `flex-end`,
    "& > button.icon-button": {
      minWidth: theme.spacing(6),
    },
    "& > div.flexible-space": {
      flexBasis: `100%`,
      flexShrink: 1,
    },
  },
  paper: {
    width: theme.spacing(32) + 1,
    paddingTop: theme.spacing(10),
    paddingLeft: 0,
    paddingRight: 0,
  },
  children: {
    [desktopBreakpoint(theme)]: {
      marginLeft: theme.spacing(32) + 1,
    },
  },
}), { name: `lib-react-dashboard` })
export default function Drawer (props) {
  const { onClose } = props
  const classes = useStyles()
  const t = useTranslation()
  const isDesktop = useMediaQuery(desktopBreakpoint)
  const content = (
    <Fragment>
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <CloseButton isDesktop={isDesktop} t={t} onClick={onClose} />
          <div className="flexible-space" />
          <Settings>{open => <SettingsButton t={t} onClick={open} />}</Settings>
        </Toolbar>
      </AppBar>
      <Nav t={t} onClick={onClose} />
    </Fragment>
  )
  const drawerClasses = { paper: classes.paper }
  const drawer = (
    isDesktop ? <MuiDrawer classes={drawerClasses} variant="permanent">{content}</MuiDrawer> :
    (
      <MuiDrawer
        id="lib-react-dashboard"
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