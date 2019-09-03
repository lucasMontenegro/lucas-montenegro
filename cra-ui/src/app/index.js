import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import store from "./store"
import "typeface-roboto"
import "./fontAwesome"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import Examples from "./Examples"
import App from "./App"
const theme = createMuiTheme()
const mainRoute = <Route component={App} />
const app = (
  <Provider store={store}>
    <CssBaseline />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {
          process.env.NODE_ENV === `production` ? mainRoute :
          (
            <Switch>
              <Route path="/examples" component={Examples} />
              {mainRoute}
            </Switch>
          )
        }
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById(`root`))
