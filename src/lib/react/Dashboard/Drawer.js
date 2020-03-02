import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import React, { Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import CloseButton from "./CloseButton"
import AccessButton from "lib/react/AccessButton"
import Settings from "lib/react/Settings"
import SettingsButton from "./SettingsButton"
import Divider from "@material-ui/core/Divider"
import Nav from "./Nav"
import MuiDrawer from "@material-ui/core/Drawer"
const desktopBreakpoint = theme => theme.breakpoints.up(`md`)
const useStyles = makeStyles(theme => ({
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.type === `dark` ? `#1d1d1dc4` : `#ffffffc4`,
    width: theme.spacing(32),
    left: 0,
    right: `auto`,
    paddingRight: `0px !important`,
  },
  toolbar: {
    justifyContent: `space-between`,
    "& > button.icon-button": {
      minWidth: theme.spacing(6),
    },
  },
  paper: {
    width: theme.spacing(32) + 1,
    paddingTop: theme.spacing(6),
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up(`sm`)]: {
      paddingTop: theme.spacing(8),
    },
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
          <AccessButton closeDashboard={onClose} />
          <Settings>{open => <SettingsButton t={t} onClick={open} />}</Settings>
        </Toolbar>
      </AppBar>
      <Divider />
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