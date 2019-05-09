import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"

const NotFound = ({ routerProps, match, language, Frame, frameProps }) => {
  if (!match) {
    return null
  }
  const { title, text } = locales.render[language]
  const { referrer } = routerProps.location.state || {}
  return (
    <Frame title={title} other={frameProps}>
      <Typography variant="body2">
        {referrer && (
          (referrer.pathname || ``)
          + (referrer.search || ``)
          + (referrer.hash || ``)
        )}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Frame>
  )
}

export default {
  Component: NotFound,
  locales: locales.exports,
  exampleLocations: [
    {
      pathname: `/404`,
      search: ``,
      hash: ``,
    },
  ],
}
