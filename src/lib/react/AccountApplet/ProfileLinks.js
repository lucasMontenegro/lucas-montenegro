/**
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Layout from "./Layout"
import Link from "lib/react/links/Link"
const useStyles = makeStyles(theme => ({
  avatarLink: {
    display: `block`,
  },
}), { name: `lib-react-account_applet-profile_links` })
/**/
export default function ProfileLinks (props) {
  throw Error(`TO DO`)
  /**
  const classes = useStyles()
  return (
    <Layout
      avatar={
        <Link className={classes.avatarLink} to={location}>
          <img
            src={picture}
            alt={props.t({ en: () => `User avatar`, es: () => `Avatar del usuario` })}
          />
        </Link>
      }
      topText={<Link to={location}>{displayName}</Link>}
      bottomText={props.logoutButton}
    />
  )
  /**/
}