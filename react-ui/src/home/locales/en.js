import React from "react"
import HomeIcon from "@material-ui/icons/Home"

export default {
  exports: {
    match (location) {
      return /^\/english\/home\/?/.test(location.pathname)
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
          pathname: `/english/home`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/english/home`,
        search: ``,
        hash: ``,
      },
      text: `Home`,
      icon: <HomeIcon />,
    },
  },
  render: {
    title: `Home`,
    text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
  },
}

