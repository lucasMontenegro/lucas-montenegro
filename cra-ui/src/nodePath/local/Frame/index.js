import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import MenuSlider from "./MenuSlider"
import MenuList from "./MenuList"
const leftWidth = `256px`
const rightWidth = `1024px`
const drawerBgColor = `#18202c`
const bodyBgColor = `#eaeff1`
const breakpointDown = theme.breakpoints.down(800)
const breakpointUp = theme.breakpoints.up(800)
const Frame = withStyles(
  {
    root: {
      height: `100vh`,
      width: `100vw`,
      display: `flex`,
    },
    slider: {
      height: `100%`,
      flex: `0 0 4ch`,
      [breakpointUp]: {
        display: `none`,
      },
    },
    mainWrapper: {
      height: `100%`,
      flex: `0 1 100%`,
      display: `flex`,
      justifyContent: `flex-end`,
      overflow: `hidden`,
    },
    scroll: {
      height: `100%`,
      overflowY: `auto`,
      WebkitOverflowScrolling: `touch`, // Add iOS momentum scrolling.
    },
    drawer: {
      backgroundColor: drawerBgColor,
      flex: `1 0 ${leftWidth}`,
      position: `relative`,
      left: 0,
      zIndex: 1200,
      [breakpointUp]: {
        position: `static`,
      },
      "& > *": {
        color: `rgba(255, 255, 255, 0.7)`,
        backgroundColor: drawerBgColor,
        width: `100%`,
        maxWidth: leftWidth,
        float: `right`,
      },
      animationDuration: `0.5s`,
      animationFillMode: `forwards`,
    },
    "@keyframes drawerleft2right": {
      from: { left: `0px` },
      to: { left: leftWidth },
    },
    "@keyframes drawerright2left": {
      from: { left: leftWidth },
      to: { left: `0px` },
    },
    drawerLeftToRight: {
      animationName: `$drawerleft2right`,
    },
    drawerRightToLeft: {
      animationName: `$drawerright2left`,
    },
    appScroll: {
      backgroundColor: bodyBgColor,
      flex: `1 1 ${rightWidth}`,
      [breakpointDown]: {
        flex: `0 0 100%`,
      },
      "& > * > *": {
        maxWidth: rightWidth,
      },
    },
    header: {
      backgroundColor: theme.palette.primary.main,
    },
    bar: {
      zIndex: 0,
    },
    appBody: {
      backgroundColor: bodyBgColor,
    },
  }
)(
  class Frame extends React.Component {
    constructor (props) {
      super(props)
      this.state = { sliderValue: 0 }
      this.setSlider = this.setSlider.bind(this)
      this.closeTempDrawer = this.closeTempDrawer.bind(this)
    }
    setSlider (event, value) {
      if (value !== this.state.sliderValue) {
        this.setState({ sliderValue: value })
      }
    }
    closeTempDrawer () {
      if (this.state.sliderValue === 1) {
        this.setState({ sliderValue: 0 })
      }
    }
    render () {
      const {
        classes,
        subtitle,
        children,
        navLinks,
        languageLinks,
      } = this.props
      return (
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <MenuSlider
              className={classes.slider}
              value={this.state.sliderValue}
              onChange={this.setSlider}
              label="Menu"
            />
            <div className={classes.mainWrapper}>
              <Paper
                square
                elevation={4}
                className={this.state.sliderValue > 0
                  ? `${classes.scroll} ${classes.drawer} ${classes.drawerLeftToRight}`
                  : `${classes.scroll} ${classes.drawer} ${classes.drawerRightToLeft}`
                }
              >
                <MenuList
                  navLinks={navLinks}
                  languageLinks={languageLinks}
                  onClick={this.closeTempDrawer}
                />
              </Paper>
              <div className={`${classes.scroll} ${classes.appScroll}`}>
                <div className={classes.header}>
                  <AppBar
                    component="div"
                    className={classes.bar}
                    color="primary"
                    position="static"
                    elevation={0}
                  >
                    <Toolbar>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                          <Typography color="inherit" variant="h5" component="h1">
                            Lucas Montenegro
                          </Typography>
                        </Grid>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                  <AppBar
                    component="div"
                    className={classes.bar}
                    color="primary"
                    position="static"
                    elevation={0}
                  >
                    <Toolbar>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                          <Typography color="inherit" variant="h6" component="h2">
                            {subtitle}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                </div>
                <div className={classes.appBody}><div>{children}</div></div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      )
    }
  }
)
export default Frame