import React from "react"
import { Route } from "react-router-dom"
import createMainRouter from "local/createMainRouter"
import home from "./home"
import counter from "./counter"
import notFound from "./notFound"
const MainRouter = createMainRouter({
  defaultLanguage: `en`,
  languages: {
    en: `English`,
    es: `Español`,
  },
  matchRoot ({ pathname }) {
    return /^\/examples\/main-router\/?$/.test(pathname)
  },
  apps: {
    home,
    counter,
    notFound,
  },
})
const mainRouter = (
  <Route
    key="main-router"
    path="/examples/main-router"
    component={MainRouter}
  />
)
export default mainRouter