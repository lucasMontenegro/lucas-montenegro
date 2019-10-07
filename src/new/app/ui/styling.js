import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import "typeface-roboto"
import "new/app/ui/fontAwesome"
import store from "new/app/ui/store"
export default (
  <ThemeProvider theme={createMuiTheme()}>
    <CssBaseline />
    {store}
  </ThemeProvider>
)