import React from "react"
import { Route, Redirect } from "react-router-dom"

export default routes => {
  // components that need to mantain their state independently from the route
  const persistent = routes.filter(route => !route.redirect && route.renderHidden)
  return () => <Route
    children={({ location }) => {
      const main = routes.find(route => route.match(location))
      if (main.redirect) {
        return <Redirect to={main.from(location)} />
      }
      return main.render(
        location,
        persistent.filter(route => route !== main).map(route => route.renderHidden())
      )
    }}
  />
}
