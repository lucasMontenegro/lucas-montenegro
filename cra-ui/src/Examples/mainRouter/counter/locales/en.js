import React, { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default {
  routerOptions: {
    match (location) {
      return /^\/examples\/main-router\/english\/counter\/?/.test(location.pathname)
    },
    translateLink: {
      toIntl (location) {
        return {
          ...location,
          key: undefined,
          pathname: `/c`,
        }
      },
      toLocal (location) {
        return {
          ...location,
          key: undefined,
          pathname: `/examples/main-router/english/counter`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/examples/main-router/english/counter`,
        search: ``,
        hash: ``,
      },
      text: `Counter`,
      icon: <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />,
    },
  },
  render: {
    appTitle: `Counter`,
    textJsx: count => (
      <Fragment>
        Time since you loaded the website: {count} seconds.
      </Fragment>
    ),
  },
}