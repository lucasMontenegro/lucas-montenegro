import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "lib/react/CssBaseline"
import { Router as ReactRouter, Switch } from "react-router-dom"
import browserHistory from "lib/browserHistory"

import throwPropTypeErrors from "lib/throwPropTypeErrors/example"
import languageDetector from "lib/languageDetector/example"
import routing from "lib/routing/example"
import links from "lib/links/examples"
//import TranslationDialog from "lib/TranslationDialog/example"
import react from "lib/react/examples"
import Translation from "lib/Translation/example"
import Home from "lib/Home/example"
import NotFound from "lib/NotFound/example"
ReactDOM.render((
  <ThemeProvider theme={createMuiTheme()}>
    <CssBaseline />
    <ReactRouter history={browserHistory}>
      <Switch>
        {throwPropTypeErrors}
        {languageDetector}
        {routing}
        {links}
        {/*TranslationDialog*/}
        {react}
        {Translation}
        {Home}
        {NotFound}
      </Switch>
    </ReactRouter>
  </ThemeProvider>
), document.getElementById(`root`))