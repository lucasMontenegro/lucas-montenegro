import React from "react"
import createBaseClient from "new/local/paperbase/createBaseClient"
import NotFoundView from "new/local/notFound/NotFoundView"
import useReferrer from "new/local/notFound/useReferrer"
export default function notFound (appName, routing) {
  const BaseClient = createBaseClient({
    appName,
    clientName: `notFound`,
    routing,
  })
  function NotFound (props) {
    const { languageCode, match, location } = props
    const referrer = useReferrer(match, location)
    return (
      <NotFoundView
        languageCode={languageCode}
        match={match}
        referrer={referrer}
        routing={routing}
        BaseClient={BaseClient}
        clientProps={props}
      />
    )
  }
  NotFound.propTypes = createBaseClient.clientPropTypes
  return NotFound
}