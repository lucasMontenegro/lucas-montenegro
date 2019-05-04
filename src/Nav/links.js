import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const links = {}
export default links

links.english = {
  home: {
    to: `/english/home`,
    isActive (location) {
      return /^\/english\/home\/?$/.test(location.pathname)
    },
    text: `Home`,
    icon: <HomeIcon />,
  },
  counter: {
    to: `/english/counter`,
    isActive (location) {
      return /^\/english\/counter\/?$/.test(location.pathname)
    },
    text: `Counter`,
    icon: <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />,
  },
}

links.español = {
  home: {
    to: `/español/inicio`,
    isActive (location) {
      return /^\/español\/inicio\/?$/.test(location.pathname)
    },
    text: `Inicio`,
    icon: <HomeIcon />,
  },
  counter: {
    to: `/español/contador`,
    isActive (location) {
      return /^\/español\/contador\/?$/.test(location.pathname)
    },
    text: `Contador`,
    icon: <FontAwesomeIcon icon={[`fas`, `stopwatch`]} />,
  },
}
