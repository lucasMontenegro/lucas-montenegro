import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import BodyWrapper from "./BodyWrapper"
import Navigator from "./Navigator"
import Drawer from "./Drawer"
import DrawerSlider from "./DrawerSlider"
import { supportedLanguages } from "./languages"
export supportedLanguages
const leftWidth = `256px`
const rightWidth = `1024px`
const drawerColor =`rgba(255, 255, 255, 0.7)`
const drawerBgColor = `#18202c`
const bodyBgColor = `#eaeff1`
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
    column: {
      height: `100%`,
      overflowY: `auto`,
      WebkitOverflowScrolling: `touch`,
    },
    leftColumn: {
      display: `none`,
      backgroundColor: drawerBgColor,
      flex: `1 0 ${leftWidth}`,
      zIndex: 10,
      [breakpointUp]: {
        display: `block`,
      },
      "& > *": {
        color: drawerColor,
        backgroundColor: drawerBgColor,
        width: `100%`,
        maxWidth: leftWidth,
        float: `right`,
      },
    },
    rightColumn: {
      backgroundColor: bodyBgColor,
      flex: `0 0 100%`,
      [breakpointUp]: {
        flex: `1 1 ${rightWidth}`,
      },
      "& > * > *": {
        maxWidth: rightWidth,
      },
    },
  }
)(
  class Frame extends React.Component {
    constructor (props) {
      super(props)
      this.state = { sliderValue: 0, drawerValue: 0 }
      [
        `setSlider`,
        `setDrawer`,
        `closePermDrawer`,
        `closeTempDrawer`,
      ].forEach(method => this[method] = this[method].bind(this))
    }
    setSlider (event, value) {
      this.setState(state => {
        if (value !== state.sliderValue) {
          return { ...state, sliderValue: value }
        }
        return state
      })
    }
    setDrawer (event, value) {
      this.setState(state => {
        if (value !== state.drawerValue && value === state.sliderValue) {
          return { ...state, drawerValue: value }
        }
        return state
      })
    }
    closePermDrawer () {
      this.setState(state => {
        if (state.drawerValue !== 0) {
          return { ...state, drawerValue: 0, sliderValue: 0 }
        }
        return state
      })
    }
    closeTempDrawer () {
      this.setState(state => {
        if (state.drawerValue === 1) {
          return { ...state, drawerValue: 0, sliderValue: 0 }
        }
        return state
      })
    }
    render () {
      const {
        classes,
        appName: activeApp,
        languageCode,
        Dashboard,
        dashboardProps,
        bodies,
        bodyProps,
        locations,
        translateLocationFrom,
        navLinks,
      } = this.props
      const drawerContent = activeApp ? (
        <Navigator
          navLinks={navLinks}
          locations={locations}
          onClick={this.closeTempDrawer}
        >
          {Dashboard ? <Dashboard other={dashboardProps} /> : null}
        </Navigator>
      ) : null
      return (
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <DrawerSlider
              paper
              id="bottom-slider"
              className={classes.slider}
              languageCode={languageCode}
              value={this.state.sliderValue}
              onChange={this.setSlider}
              onChangeCommitted={this.setDrawer}
            />
            <div className={classes.mainWrapper}>
              <Paper
                square
                elevation={4}
                className={`${classes.column} ${classes.leftColumn}`}
              >
                {drawerContent}
              </Paper>
              <Drawer
                open={this.state.drawerValue > 0}
                onClose={this.closePermDrawer}
                sliderProps={{
                  languageCode,
                  value: this.state.sliderValue,
                  onChange: this.setSlider,
                  onChangeCommitted: this.setDrawer,
                }}
              >
                {drawerContent}
              </Drawer>
              <div className={`${classes.column} ${classes.rightColumn}`}>
                {bodies.map(({ appName, Body }) => (
                  <Body
                    key={appName}
                    match={activeApp === appName}
                    languageCode={languageCode}
                    Wrapper={BodyWrapper}
                    wrapperProps={{
                      languageCode,
                      appName,
                      locations,
                      translateLocationFrom,
                    }}
                    other={bodyProps}
                  />
                ))}
              </div>
            </div>
          </div>
        </ThemeProvider>
      )
    }
  }
)
export default Frame