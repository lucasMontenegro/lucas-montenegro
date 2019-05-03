import React from "react"
import { Route } from "react-router-dom"

export default routes => {
  // components that need to mantain their state independently from the route
  const persistent = routes.filter(route => !route.redirect && route.renderHidden)
  return () => <Route
    children={({ location }) => {
      const main = routes.find(route => route.match(location))
      const hiddenChildren = persistent
        .filter(route => route.name !== main.name)
        .map(route => route.renderHidden())
      return main.render(
        location,
        hiddenChildren
      )
    }}
  />
}
