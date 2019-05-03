import React, { Fragment } from "react"
import { Redirect } from "react-router-dom"
import routes from "../routes"

const persistent = routes.filter(route => route.persistent)
export default props => {
  const main = routes.filter(route => route.match(props.location))
  return (
    <Fragment>
      <main.Component show key={main.key} {...props} />
      {persistent.map(route => <route.Component key={route.key} {...props} />)}
    </Fragment>
  )
}
