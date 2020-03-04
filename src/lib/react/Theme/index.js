import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import { useDarkMode } from "lib/react/DarkMode"
import { createMuiTheme } from "@material-ui/core/styles"
import PropTypes from "prop-types"
export default function Theme (props) {
  return (
    <ThemeProvider theme={useDarkMode().value ? darkTheme : lightTheme}>
      {props.children}
    </ThemeProvider>
  )
}
Theme.propTypes = {
  children: PropTypes.node,
}
const lightTheme = createMuiTheme({
  palette: {
    type: `light`,
    primary: {
      main: `#02838c`,
      contrastText: `#ffffff`,
    },
    secondary: {
      main: `#bd1a34`,
      contrastText: `#ffffff`,
    },
    error: {
      main: `#e62600`,
      contrastText: `#ffffff`,
    },
    background: {
      default: `#edf0f2`,
      paper: `#ffffff`,
    },
  },
})
const darkTheme = createMuiTheme({
  palette: {
    type: `dark`,
    primary: {
      main: `#00c0ce`,
      contrastText: `#000000`,
    },
    secondary: {
      main: `#f58294`,
      contrastText: `#000000`,
    },
    error: {
      main: `#ff4824`,
      contrastText: `#000000`,
    },
    background: {
      default: `#121212`,
      paper: `#1d1d1d`,
    },
  },
})