import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default {
  exports: {
    match (location) {
      return /^\/español\/no-encontrado\/?/.test(location.pathname)
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
          pathname: `/español/no-encontrado`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/español/no-encontrado`,
        search: ``,
        hash: ``,
      },
      text: `No Encontrado`,
      icon: <FontAwesomeIcon icon={[`far`, `dizzy`]} />,
    },
  },
  render: {
    title: `No Encontrado`,
    text: `No se encontró la página solicitada. Disculpe las molestias.`,
  },
}
