import React, { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default {
  exports: {
    match (location) {
      return /^\/english\/counter\/?/.test(location.pathname)
    },
    translateLink: {
      toIntl (location) {
        return {
          ...location,
          pathname: `/c`,
        }
      },
      toLocal (location) {
        return {
          ...location,
          pathname: `/english/counter`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/english/counter`,
        search: ``,
        hash: ``,
      },
      text: `Counter`,
      icon: <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />,
    },
  },
  render: {
    title: `Counter`,
    textJsx: count => (
      <Fragment>
        Time since you loaded the website: {count} seconds.
      </Fragment>
    ),
  },
}
