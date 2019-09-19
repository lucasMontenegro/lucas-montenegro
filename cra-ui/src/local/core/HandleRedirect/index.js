import React, { Fragment } from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { matchPropType } from "local/core/makeRouter"
export default function HandleRedirect ({ match, children }) {
  return (
    <Fragment>
      {match.type === `redirect` && <Redirect to={match.location} />}
      {children}
    </Fragment>
  )
}
HandleRedirect.propTypes = {
  match: matchPropType.isRequired,
  children: PropTypes.node.isRequired,
}