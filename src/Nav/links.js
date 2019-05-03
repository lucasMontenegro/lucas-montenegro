import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const links = {}
export default links

{
  const icon = <HomeIcon />
  links.home = {
    locales: {
      english: {
        to: `/english/home`,
        isActive (location) {
          return /^\/english\/home\/?$/.test(location.pathname)
        },
        text: `Home`,
        icon,
      },
      español: {
        to: `/español/inicio`,
        isActive (location) {
          return /^\/español\/inicio\/?$/.test(location.pathname)
        },
        text: `Inicio`,
        icon,
      },
    },
  }
}
{
  const icon = <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />
  links.counter = {
    locales: {
      english: {
        to: `/english/counter`,
        isActive (location) {
          return /^\/english\/counter\/?$/.test(location.pathname)
        },
        text: `Counter`,
        icon,
      },
      español: {
        to: `/español/contador`,
        isActive (location) {
          return /^\/español\/contador\/?$/.test(location.pathname)
        },
        text: `Contador`,
        icon,
      },
    },
  }
}
