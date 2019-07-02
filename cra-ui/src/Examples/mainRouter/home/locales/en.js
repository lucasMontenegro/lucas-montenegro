import React from "react"
import HomeIcon from "@material-ui/icons/Home"
export default {
  exports: {
    match (location) {
      return /^\/examples\/main-router\/english\/home\/?/.test(location.pathname)
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
          pathname: `/examples/main-router/english/home`,
        }
      },
    },
    navLink: {
      location: {
        pathname: `/examples/main-router/english/home`,
        search: ``,
        hash: ``,
      },
      text: `Home`,
      icon: <HomeIcon />,
    },
  },
  render: {
    appTitle: `Home`,
    text: `Hello! Welcome to my personal website. My name is Lucas Montenegro and I am a Web Developer from Argentina.`,
  },
}