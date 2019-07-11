import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default {
  routerOptions: {
    match (location) {
      return /^\/examples\/main-router\/español\/no-encontrado\/?/.test(location.pathname)
    },
    translateLink: {
      toIntl (location) {
        return {
          ...location,
          key: undefined,
          pathname: `/404`,
        }
      },
      toLocal (location) {
        return {
          ...location,
          key: undefined,
          pathname: `/examples/main-router/español/no-encontrado`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/examples/main-router/español/no-encontrado`,
        search: ``,
        hash: ``,
      },
      text: `No Encontrado`,
      icon: <FontAwesomeIcon icon={[`far`, `dizzy`]} />,
    },
  },
  render: {
    appTitle: `No Encontrado`,
    text: `No se encontró la página solicitada. Disculpe las molestias.`,
    defaultText: `Las páginas no encontradas redirigen aquí.`,
  },
}
