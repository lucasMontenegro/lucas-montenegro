import React, { Fragment } from "react"
import { Redirect } from "react-router-dom"
export default function HandleRedirect ({ match, children }) {
  return (
    <Fragment>
      {match.type === `redirect` && <Redirect to={match.location} />}
      {children}
    </Fragment>
  )
}