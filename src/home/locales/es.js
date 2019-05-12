import React from "react"
import HomeIcon from "@material-ui/icons/Home"

export default {
  exports: {
    match (location) {
      return /^\/español\/inicio\/?/.test(location.pathname)
    },
    translateLink: {
      toIntl (location) {
        return {
          ...location,
          pathname: `/h`,
        }
      },
      toLocal (location) {
        return {
          ...location,
          pathname: `/español/inicio`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/español/inicio`,
        search: ``,
        hash: ``,
      },
      text: `Inicio`,
      icon: <HomeIcon />,
    },
  },
  render: {
    title: `Inicio`,
    text: `Hola! Bienvenido a mi página web personal. Mi nombre es Lucas Montenegro y soy un Programador Web de Argentina.`,
  },
}

