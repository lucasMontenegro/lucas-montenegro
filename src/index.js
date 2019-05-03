import React, { Fragment } from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import "typeface-roboto"
import "./font-awesome"

import render from "./render"
import store from "./store"
import theme from "./theme"
import createRouter from "./createRouter"
import languageNotFound from "./languageNotFound"
import home from "./home"
import * as serviceWorker from "./serviceWorker"

const Router = createRouter([
  ...home,
  languageNotFound,
])

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
