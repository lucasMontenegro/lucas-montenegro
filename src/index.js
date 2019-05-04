import React, { Fragment } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import "typeface-roboto"
import "./font-awesome"
import "./i18n"

import render from "./render"
import store from "./store"
import theme from "./theme"
import createRouter from "./createRouter"
import detectLanguage from "./detectLanguage"
import home from "./home"
import counter from "./counter"
import * as serviceWorker from "./serviceWorker"

const Router = createRouter([...home, ...counter, detectLanguage])

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <Router />
        </Fragment>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
