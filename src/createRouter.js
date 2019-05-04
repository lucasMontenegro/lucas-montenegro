import React, { Fragment } from "react"
import { Route } from "react-router-dom"

export default routes => () => (
  <Route
    children={({ location }) => {
      const n = routes.findIndex(route => route.match(location))
      return (
        <Fragment>
          {routes.map((route, i) => route.render(i === n, location))}
        </Fragment>
      )
    }}
  />
)
