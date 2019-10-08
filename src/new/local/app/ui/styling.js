const React = require("react")
const { default: CssBaseline } = require("@material-ui/core/CssBaseline")
const { ThemeProvider } = require("@material-ui/styles")
const { createMuiTheme } = require("@material-ui/core/styles")
require("typeface-roboto")
require("new/local/app/ui/fontAwesome")
const { default: store } = require("new/local/app/ui/store")
exports.default = (
  <ThemeProvider theme={createMuiTheme()}>
    <CssBaseline />
    {store}
  </ThemeProvider>
)