import { makeStyles } from "@material-ui/core/styles"
import useTranslation from "lib/react/useTranslation"
import useMobileNav from "./useMobileNav"
import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { useAppDrawerOpener } from "lib/react/AppDrawer"
//import { useDashboardOpener } from "lib/react/Dashboard"
import { FontAwesomeIcon } from "lib/react/fontAwesome"
const useStyles = makeStyles(theme => ({
  appBar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    top: `auto`,
    bottom: 0,
  },
  toolbar: {
    "& > button.icon-button": {
      minWidth: theme.spacing(6),
    },
    "& > div.flexible-space": {
      flexBasis: `100%`,
      flexShrink: 1,
    },
  },
}), { name: `lib-react-main_bar-mobile_bar` })
export default function MobileBar () {
  const classes = useStyles()
  const t = useTranslation()
  const mobileNav = useMobileNav(t)
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Tooltip
          title={t({
            en: () => `Open dashboard`,
            es: () => `Abrir panel de control`,
          })}
        >
          <IconButton
            className="icon-button"
            edge="start"
            aria-controls="lib-react-app_drawer"
            onClick={useAppDrawerOpener()}
          >
          {/*
            aria-controls="lib-react-dashboard"
            onClick={useDashboardOpener()}
          >
          */}
            <FontAwesomeIcon icon={[`fas`, `bars`]} />
          </IconButton>
        </Tooltip>
        <div className="flexible-space" />
        <Tooltip
          title={t({
            en: () => `Open quick navigation`,
            es: () => `Abrir navegación rápida`,
          })}
        >
          <IconButton
            edge="end"
            className="icon-button"
            aria-controls="lib-react-main_bar-mobile_nav"
            onClick={mobileNav.open}
          >
            <FontAwesomeIcon icon={[`fas`, `caret-up`]} />
          </IconButton>
        </Tooltip>
        {mobileNav.node}
      </Toolbar>
    </AppBar>
  )
}