import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"

const Home = ({ routerProps, match, language, Frame, frameProps }) => {
  if (!match) {
    return null
  }
  const { title, text } = locales.render[language]
  return (
    <Frame title={title} other={frameProps}>
      <Typography variant="body1">{text}</Typography>
    </Frame>
  )
}

export default {
  Component: Home,
  locales: locales.exports,
  exampleLocations: [
    {
      pathname: `/h`,
      search: ``,
      hash: ``,
    },
  ],
}
