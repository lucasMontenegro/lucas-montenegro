import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"
import createLocalizedRoutes from "../createLocalizedRoutes"
import Nav from "../Nav"

export default createLocalizedRoutes({
  makeInternationalMatch (language) {
    const re = new RegExp(`^/${language}(?:/h)?/?$`)
    return location => re.test(location.pathname)
  },
  locales,
  render (match, language, navProps) {
    if (match) {
      const { title, text } = locales[language].render
      return {
        title,
        nav: <Nav other={navProps} />,
        node: <Typography key="home" variant="body1">{text}</Typography>
      }
    }
    return { node: null }
  }
})
