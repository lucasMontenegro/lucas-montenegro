import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default {
  exports: {
    match (location) {
      return /^\/examples\/main-router\/english\/not-found\/?/.test(location.pathname)
    },
    translateLink: {
      toIntl (location) {
        return {
          ...location,
          pathname: `/404`,
        }
      },
      toLocal (location) {
        return {
          ...location,
          pathname: `/examples/main-router/english/not-found`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/examples/main-router/english/not-found`,
        search: ``,
        hash: ``,
      },
      text: `Not Found`,
      icon: <FontAwesomeIcon icon={[`far`, `dizzy`]} />,
    },
  },
  render: {
    appTitle: `Not Found`,
    text: `Sorry, the page you were looking for is not available.`,
    defaultText: `Not found pages redirect here.`,
  },
}