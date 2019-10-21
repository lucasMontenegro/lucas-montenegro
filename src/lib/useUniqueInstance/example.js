import React, { Fragment } from "react"
import { Route } from "react-router-dom"
import useUniqueInstance from "lib/useUniqueInstance"
import queryString from "query-string"
import globals from "lib/utils/globals"
function Message ({ id }) {
  const name = useUniqueInstance(() => `foo`)
  return (
    <div>
      {id} &nbsp;
      <span id={id}>{JSON.stringify(name)}</span>
    </div>
  )
}
function Example (props) {
  const search = queryString.parse(props.location.search)
  globals.process = { env: { NODE_ENV: search.NODE_ENV } }
  return (
    <Fragment>
      <Message id="first" />
      {search.unique === `false` && <Message id="second" />}
    </Fragment>
  )
}
export default (<Route exact path="/useUniqueInstance" component={Example} />)