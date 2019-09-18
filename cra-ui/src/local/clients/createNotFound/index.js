import React, { useRef } from "react"
import createBaseClient from "local/core/createBaseClient"
import NotFoundView from "./NotFoundView"
export default function createNotFound (options) {
  const {
    appName,
    initialLocation,
    linkTranslators,
    routing,
  } = options
  const BaseClient = createBaseClient({
    appName,
    clientName: `notFound`,
    initialLocation,
    linkTranslators,
  })
  function NotFound (props) {
    const { languageCode, match, location } = props
    const ref = useRef({ location: null, referrer: null })
    if (match && ref.current.location !== location) {
      const obj = location.state
      ref.current = {
        location,
        referrer: obj instanceof Object ? `${obj.pathname}${obj.search}${obj.hash}` : null,
      }
    }
    return (
      <NotFoundView
        hidden={ref.current.referrer === null && !match}
        referrer={ref.current.referrer}
        languageCode={languageCode}
        routing={routing}
        BaseClient={BaseClient}
        clientProps={props}
      />
    )
  }
  NotFound.propTypes = createBaseClient.clientPropTypes
  return NotFound
}