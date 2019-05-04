import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"
import createLocalizedRoutes from "../createLocalizedRoutes"
import Frame from "../Frame"

const Home = ({ match, language, location }) => {
  if (match) {
    const { render, frameProps } = locales[language]
    return (
      <Frame language={language} location={location} {...frameProps}>
        <Typography variant="body1">{render.text}</Typography>
      </Frame>
    )
  }
  return null
}

export default createLocalizedRoutes({
  name: `home`,
  makeInternationalMatch (language) {
    const re = new RegExp(`^/${language}(?:/h)?/?$`)
    return location => re.test(location.pathname)
  },
  locales,
  Component: Home,
})
