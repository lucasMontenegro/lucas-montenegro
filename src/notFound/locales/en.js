import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default {
  exports: {
    match (location) {
      return /^\/english\/not-found\/?/.test(location.pathname)
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
          pathname: `/english/not-found`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/english/not-found`,
        search: ``,
        hash: ``,
      },
      text: `Not Found`,
      icon: <FontAwesomeIcon icon={[`far`, `dizzy`]} />,
    },
  },
  render: {
    title: `Not Found`,
    text: `Sorry, the page you were looking for is not available.`,
  },
}

