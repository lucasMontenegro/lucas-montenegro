import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import store from "./store"
import "typeface-roboto"
import "./fontAwesome"
import CssBaseline from "@material-ui/core/CssBaseline"
import Examples from "./Examples"
import App from "./App"
const mainRoute = <Route component={App} />
const app = (
  <Provider store={store}>
    <CssBaseline />
    <BrowserRouter>
      {
        process.env.NODE_ENV === `production`? {mainRoute} : 
        <Switch><Route path="/examples" component={Examples} />{mainRoute}</Switch>
      }
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById(`root`))
