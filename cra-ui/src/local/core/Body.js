import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import makeTranslations from "local/makeTranslations"
const drawerButtonLabels = makeTranslations({
  en: `Open drawer`,
  es: `Abrir panel lateral`,
})
const useStyles = makeStyles({
  root: {
    backgroundColor: `#eaeff1`,
    minHeight: `100vh`,
    overflowX: `hidden`,
  },
  primaryAppBar: {
    height: 48,
  },
  expansionDiv: {
    flexBasis: `100%`,
    flexShrink: 1,
  },
  secondaryAppBar: {
    zIndex: 0,
    paddingTop: 48,
    flexWrap: `wrap-reverse`,
    flexDirection: `row`,
  },
  titleToolbar: {
    flexWrap: `wrap`,
    minHeight: 64,
    "& > *": {
      display: `flex`,
      minHeight: 48,
    },
  },
  title: {
    alignSelf: `flex-start`,
    alignItems: `center`,
    margin: 0,
  },
  subtitle: {
    alignSelf: `flex-end`,
    justifyContent: `flex-end`,
    alignItems: `flex-end`,
    flexGrow: 1,
    margin: `0 0 0 16px`,
  },
  subtitleText: {
    padding: `0 8px`,
  },
  subtitleUnderline: {
    width: `100%`,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: `white`,
  },
  secondaryToolbar: {
    alignSelf: `flex-start`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    flexGrow: 1,
    height: 48,
  },
}, { name: `Body` })
export default function Body (props) {
  const {
    languageCode,
    drawerWidth,
    viewState,
    title,
    subtitle,
    logo,
    languageDialog,
    primaryToolbar,
    secondaryToolbar,
    children,
  } = props
  const classes = useStyles()
  title && subtitle && (document.title = `${title} - ${subtitle}`)
  return (
    <div
      className={classes.root}
      style={viewState.isMobile ? undefined : { paddingLeft: drawerWidth }}
    >
      <AppBar
        color="primary"
        position="fixed"
        elevation={0}
        style={viewState.isMobile ? undefined : { width: `calc(100vw - ${drawerWidth}px)` }}
        className={classes.primaryAppBar}
      >
        <Toolbar>
          {viewState.isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              id="open-temporary-drawer"
              aria-controls="temporary-drawer"
              aria-label={drawerButtonLabels[languageCode]}
              onClick={viewState.drawer.open}
            >
              <MenuIcon />
            </IconButton>
          )}
          {logo}
          <div className={classes.expansionDiv}></div>
          {primaryToolbar}
          {languageDialog}
        </Toolbar>
      </AppBar>
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        className={classes.secondaryAppBar}
      >
        <Toolbar className={classes.titleToolbar}>
          <div className={classes.title}>
            <Typography color="inherit" variant="body1" component="h1">{title}</Typography>
          </div>
          <h2 className={classes.subtitle}>
            <div>
              <Typography
                className={classes.subtitleText}
                color="inherit"
                variant="h6"
                component="div"
              >
                {subtitle}
              </Typography>
              <div className={classes.subtitleUnderline} />
            </div>
          </h2>
        </Toolbar>
        {secondaryToolbar && (
          <Toolbar className={classes.secondaryToolbar}>{secondaryToolbar}</Toolbar>
        )}
      </AppBar>
      {children}
    </div>
  )
}