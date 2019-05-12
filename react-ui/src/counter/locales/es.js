import React, { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default {
  exports: {
    match (location) {
      return /^\/español\/contador\/?/.test(location.pathname)
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
          pathname: `/español/contador`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/español/contador`,
        search: ``,
        hash: ``,
      },
      text: `Contador`,
      icon: <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />,
    },
  },
  render: {
    title: `Contador`,
    textJsx: count => (
      <Fragment>
        Tiempo desde que cargaste la página: {count} segundos.
      </Fragment>
    ),
  },
}
