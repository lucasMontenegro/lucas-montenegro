import React, { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default {
  routerOptions: {
    match (location) {
      return /^\/examples\/main-router\/español\/contador\/?/.test(location.pathname)
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
          pathname: `/examples/main-router/español/contador`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/examples/main-router/español/contador`,
        search: ``,
        hash: ``,
      },
      text: `Contador`,
      icon: <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />,
    },
  },
  render: {
    appTitle: `Contador`,
    textJsx: count => (
      <Fragment>
        Tiempo desde que cargaste la página: {count} segundos.
      </Fragment>
    ),
  },
}