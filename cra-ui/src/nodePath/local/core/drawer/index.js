import React, { Fragment } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import CloseIcon from "@material-ui/icons/Close"
import theme from "local/darkTheme"
import config from "local/config"
export class DrawerState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
    this.drawerState = { open: this.open.bind(this), close: this.close.bind(this) }
  }
  open () {
    this.setState({ isOpen: true })
  }
  close () {
    this.setState({ isOpen: false })
  }
  render () {
    const { Component, other: otherProp } = this.props
    const other = otherProp || {}
    return (
      <Component {...other} drawerState={{ ...this.drawerState, isOpen: this.state.isOpen }} />
    )
  }
}
const navLabels = {
  en: `Navigation buttons`,
  es: `Botones de navegación`,
}
const closeLabels = {
  en: `Close left drawer`,
  es: `Cerrar panel izquierdo`,
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
  const { languageCode, drawerState, navButtons, children } = props
  const content = (
    <Fragment>
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
      {children}
      <nav id="drawer-nav" aria-label={navLabels[languageCode]}><List>{navButtons}</List></nav>
    </Fragment>
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
        {content}
      </Drawer>
    ) :
    <Drawer id="permanent-drawer" variant="permanent" open>{content}</Drawer>
  )
  return <ThemeProvider theme={theme}>{drawer}</ThemeProvider>
}