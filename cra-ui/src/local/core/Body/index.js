import React, { Fragment } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import PropTypes from "prop-types"
import makeTranslations, { makeTranslationsPropType } from "local/makeTranslations"
import { languageCodePropType } from "local/supportedLanguages"
import { viewStatePropType } from "local/core/useViewState"
const drawerButtonLabels = makeTranslations({
  en: `Open drawer`,
  es: `Abrir panel lateral`,
})
const maxWidth = 1024
const useStyles = makeStyles({
  root: {
    backgroundColor: `#eaeff1`,
    minHeight: `100vh`,
    overflowX: `hidden`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  content: {
    width: `100%`,
    maxWidth,
    padding: 16,
    flexShrink: 0,
    flexGrow: 1,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  primaryAppBar: {
    height: 48,
    alignItems: `center`,
  },
  primaryToolbar: {
    width: `100%`,
    maxWidth,
    justifyContent: `flex-end`,
  },
  expansionDiv: {
    flexBasis: `100%`,
    flexShrink: 1,
  },
  secondaryAppBar: {
    zIndex: 0,
    paddingTop: 8,
    alignItems: `center`,
  },
  secondaryToolbar: {
    display: `flex`,
    flexWrap: `wrap-reverse`,
    width: `100%`,
    maxWidth,
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
    margin: 0,
    display: `flex`,
    alignItems: `center`,
    "& > *": {
      margin: `0 4px`,
    },
  },
  subtitle: {
    alignSelf: `flex-end`,
    justifyContent: `flex-end`,
    alignItems: `flex-end`,
    flexGrow: 1,
    margin: `0 0 0 16px`,
  },
  subtitleText: {
    padding: `0 4px`,
  },
  subtitleUnderline: {
    width: `100%`,
    height: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: `white`,
  },
  secondaryToolbarContent: {
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
    titles,
    subtitles,
    logo,
    primaryToolbar,
    secondaryToolbar,
    responsiveToolbar,
    children,
  } = props
  const classes = useStyles()
  const title = titles[languageCode]
  const subtitle = subtitles[languageCode]
  title && subtitle && (document.title = `${subtitle} - ${title}`)
  const drawerButton = viewState.isMobile && (
    <Fragment>
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
      <div className={classes.expansionDiv}></div>
    </Fragment>
  )
  const responsivePrimaryToolbar = viewState.isMobile ? responsiveToolbar : undefined
  const responsiveSecondaryToolbar = viewState.isMobile ? undefined : responsiveToolbar
  const renderPrimaryAppBar = drawerButton || primaryToolbar || responsivePrimaryToolbar
  return (
    <div
      className={classes.root}
      style={viewState.isMobile ? undefined : { paddingLeft: drawerWidth }}
    >
      {renderPrimaryAppBar && (
        <AppBar
          id="primary-appbar"
          color="primary"
          position="fixed"
          elevation={0}
          style={viewState.isMobile ? undefined : { width: `calc(100vw - ${drawerWidth}px)` }}
          className={classes.primaryAppBar}
        >
          <Toolbar className={classes.primaryToolbar}>
            {drawerButton}
            {primaryToolbar}
            {responsivePrimaryToolbar}
          </Toolbar>
        </AppBar>
      )}
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        className={classes.secondaryAppBar}
        style={renderPrimaryAppBar ? { paddingTop: 48 } : undefined}
      >
        <div className={classes.secondaryToolbar}>
          <Toolbar className={classes.titleToolbar}>
            <div className={classes.title}>
              {logo}
              <Typography id="title" color="inherit" variant="body1" component="h1">
                {title}
              </Typography>
            </div>
            <h2 className={classes.subtitle}>
              <div>
                <Typography
                  id="subtitle"
                  className={classes.subtitleText}
                  color="inherit"
                  variant="h6"
                  component="div"
                >
                  {subtitle.toUpperCase()}
                </Typography>
                <div className={classes.subtitleUnderline} />
              </div>
            </h2>
          </Toolbar>
          {(secondaryToolbar || responsiveSecondaryToolbar) && (
            <Toolbar id="secondary-toolbar-content" className={classes.secondaryToolbarContent}>
              {secondaryToolbar}
              {responsiveSecondaryToolbar}
            </Toolbar>
          )}
        </div>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
Body.propTypes = {
  languageCode: languageCodePropType.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  viewState: viewStatePropType.isRequired,
  titles: makeTranslationsPropType(PropTypes.string).isRequired,
  subtitles: makeTranslationsPropType(PropTypes.string).isRequired,
  logo: PropTypes.node.isRequired,
  primaryToolbar: PropTypes.node,
  secondaryToolbar: PropTypes.node,
  responsiveToolbar: PropTypes.node,
  children: PropTypes.node,
}