import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import theme from "local/darkTheme"
import config from "local/config"
export class DrawerState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.drawerState = {}
    ;[`open`, `close`].forEach(key => this.drawerState[key] = this[key].bind(this))
  }
  open () {
    this.setState({ isOpen: true })
  }
  close () {
    this.setState(state => {
      if (state.isOpen) {
        return { ...state, isOpen: false }
      }
      return state
    })
  }
  render () {
    const { Component, componentProps } = this.props
    return (
      <Component
        drawerState={{ ...this.drawerState, isOpen: this.state.isOpen }}
        {...componentProps}
      />
    )
  }
}
const labels = {
  en: `Navigation buttons`,
  es: `Botones de navegación`,
}
const closeLabels = {
  en: `Close navigation`,
  es: `Cerrar navegación`,
}
const breakpoint = theme.breakpoints.down(config.breakpointWidth)
const useStyles = makeStyles({
  close: {
    textAlign: `right`,
  },
})
export function DrawerView (props) {
  const classes = useStyles(props)
  const mobile = useMediaQuery(breakpoint)
  const { languageCode, drawerState, children } = props
  const nav = (
    <nav>
      {mobile && (
        <div className={classes.close}>
          <IconButton
            id="close-temporary-drawer"
            aria-label={closeLabels[languageCode]}
            aria-controls="temporary-drawer"
            onClick={drawerState.close}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <div id="drawer-content" aria-label={labels[languageCode]}>{children}</div>
    </nav>
  )
  const drawer = (
    mobile ? (
      <Drawer
        id="temporary-drawer"
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        variant="temporary"
        open={drawerState.isOpen}
        onClose={drawerState.close}
      >
        {nav}
      </Drawer>
    ) :
    (
      <Drawer
        id="permanent-drawer"
        variant="permanent"
        open
      >
        {nav}
      </Drawer>
    )
  )
  return <ThemeProvider theme={theme}>{drawer}</ThemeProvider>
}