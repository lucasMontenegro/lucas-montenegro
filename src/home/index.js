import React from "react"
import Typography from "@material-ui/core/Typography"
import locales from "./locales"
import { localizedRoutes } from "../routing"
import Frame from "../Frame"
import Nav from "../Nav"

export default localizedRoutes({
  name: `home`,
  intl: {
    match (location) {
      return /^\/[^/]+(?:\/h)?\/?$/.test(location.pathname)
    },
  },
  locales,
  persistent: false,
  Component ({ language, hiddenSiblings, history }) {
    const { title, text } = locales[language].render
    return <Frame
      title={title}
      nav={<Nav language={language} history={history} />}
    >
      <Typography variant="body1">{text}</Typography>
      {hiddenSiblings}
    </Frame>
  }
})
