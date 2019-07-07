import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import MenuSlider from "./MenuSlider"
import ContentWrapper from "./Content"
import MenuWrapper from "./Menu"
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
        languageCode,
        navLinks,
        languageLinks,
        render,
        routerProps,
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
                {render.map(({ match, name, Menu }) => match
                  ? (
                    <Menu
                      key={name}
                      {...routerProps}
                      languageCode={languageCode}
                      Wrapper={MenuWrapper}
                      wrapperProps={{
                        languageCode,
                        navLinks,
                        languageLinks,
                        onClick: this.closeTempDrawer,
                      }}
                    />
                  )
                  : <Menu key={name} match={null} />
                )}
              </Paper>
              <div className={`${classes.scroll} ${classes.appScroll}`}>
                {render.map(({ match, name, Content }) => match
                  ? (
                    <Content
                      key={name}
                      {...routerProps}
                      languageCode={languageCode}
                      Wrapper={ContentWrapper}
                      wrapperProps={{ languageCode }}
                    />
                  )
                  : <Content key={name} match={null} />
                )}
              </div>
            </div>
          </div>
        </ThemeProvider>
      )
    }
  }
)
export const supportedLanguageCodes = [`en`, `es`]
export default Frame