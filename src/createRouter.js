import React, { Fragment } from "react"
import { Route } from "react-router-dom"

export default routes => () => (
  <Route
    children={({ location, history }) => {
      const n = routes.findIndex(route => route.match(location))
      return (
        <Fragment>
          {routes.map((route, i) => route.render(i === n, location, history))}
        </Fragment>
      )
    }}
  />
)
