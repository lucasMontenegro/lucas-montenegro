import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import theme from "local/theme"
import { withStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import Paper from "@material-ui/core/Paper"
import MenuSlider from "./MenuSlider"
import ContentWrapper from "./Content"
import MenuWrapper from "./Menu"
const leftWidth = `256px`
const rightWidth = `1024px`
const drawerColor =`rgba(255, 255, 255, 0.7)`
const drawerBgColor = `#18202c`
const bodyBgColor = `#eaeff1`
const breakpointUp = theme.breakpoints.up(`md`)
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
    drawerPaper: {
      outline: `none`,
      display: `flex`,
      backgroundColor: drawerBgColor,
    },
    drawerSlider: {
      height: `100vh`,
      flex: `0 0 4ch`,
    },
    drawerMenu: {
      color: drawerColor,
      backgroundColor: drawerBgColor,
      height: `100vh`,
      flex: `0 1 100%`,
      overflowY: `auto`,
      WebkitOverflowScrolling: `touch`, // Add iOS momentum scrolling.
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
      this.setSlider = this.setSlider.bind(this)
      this.setDrawer = this.setDrawer.bind(this)
      this.closePermDrawer = this.closePermDrawer.bind(this)
      this.closeTempDrawer = this.closeTempDrawer.bind(this)
    }
    setSlider (event, value) {
      this.setState(state => {
        if (value !== this.state.sliderValue) {
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
        if (this.state.drawerValue === 1) {
          return { ...state, drawerValue: 0, sliderValue: 0 }
        }
        return state
      })
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
      const activeApp = render.find(({ match }) => match)
      const menu = (
        <activeApp.Menu
          key={activeApp.name}
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
      return (
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <MenuSlider
              className={classes.slider}
              value={this.state.sliderValue}
              onChange={this.setSlider}
              onChangeCommitted={this.setDrawer}
              label="Menu"
            />
            <div className={classes.mainWrapper}>
              <Paper
                square
                elevation={4}
                className={`${classes.column} ${classes.leftColumn}`}
              >
                {menu}
              </Paper>
              <Hidden mdUp implementation="js">
                <Drawer
                  PaperProps={{
                    className: classes.drawerPaper,
                    style: { width: leftWidth },
                  }}
                  variant="temporary"
                  open={this.state.drawerValue > 0}
                  onClose={this.closePermDrawer}
                >
                  <MenuSlider
                    className={classes.drawerSlider}
                    value={this.state.sliderValue}
                    onChange={this.setSlider}
                    onChangeCommitted={this.setDrawer}
                    label="Menu"
                  />
                  <div className={classes.drawerMenu}>{menu}</div>
                </Drawer>
              </Hidden>
              <div className={`${classes.column} ${classes.rightColumn}`}>
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