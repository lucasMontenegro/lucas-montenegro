import React from "react"
import { Route } from "react-router-dom"
import MainRouter from "local/MainRouter"
import home from "./home"
import counter from "./counter"
import notFound from "./notFound"
const options = {
  matchRoot ({ pathname }) {
    return /^\/examples\/main-router\/?$/.test(pathname)
  },
  apps: {
    home,
    counter,
    notFound,
  },
}
const mainRouter = (
  <Route
    key="mainRouter"
    path="/examples/main-router"
    render={props => <MainRouter options={options} routerProps={props} />}
  />
)
export default mainRouter