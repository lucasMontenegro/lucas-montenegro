import React from "react"
import { Redirect } from "react-router-dom"
import { languageCodePropType } from "local/supportedLanguages"
import makeLocationPropType from "local/core/propTypes/makeLocationPropType"
import routingPropType from "local/core/propTypes/routingPropType"
export default function RedirectTo404 ({ languageCode, referrer, routing }) {
  return <Redirect to={{ ...routing.locations.notFound[languageCode], state: { referrer } }} />
}
RedirectTo404.propTypes = {
  languageCode: languageCodePropType.isRequired,
  referrer: makeLocationPropType().isRequired,
  routing: routingPropType.isRequired,
}