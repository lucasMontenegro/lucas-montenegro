import React from "react"
import HomeIcon from "@material-ui/icons/Home"

export default {
  home: {
    locales: {
      english: {
        to: `/english/home`,
        isActive (location) {
          return /^\/english\/home\/?$/.test(location.pathname)
        },
        text: `Home`,
        icon: <HomeIcon />,
      },
      español: {
        to: `/español/inicio`,
        isActive (location) {
          return /^\/español\/inicio\/?$/.test(location.pathname)
        },
        text: `Inicio`,
        icon: <HomeIcon />,
      },
    },
  },
}
