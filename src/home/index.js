import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"
import createLocalizedRoutes from "../createLocalizedRoutes"
import Frame from "../Frame"
import Nav from "../Nav"

export default createLocalizedRoutes({
  name: `home`,
  makeInternationalMatch (language) {
    const re = new RegExp(`^/${language}(?:/h)?/?$`)
    return location => re.test(location.pathname)
  },
  locales,
  FrameComponent ({ redirect, childKey, language, navProps, frameProps }) {
    if (redirect) {
      return (
        <Frame
          redirect={true}
          other={frameProps}
        />
      )
    }
    const { title, text } = locales[language].render
    return (
      <Frame
        title={title}
        nav={<Nav other={navProps} />}
        other={frameProps}
      >
        <Typography key={childKey} variant="body1">{text}</Typography>
      </Frame>
    )
  },
})
