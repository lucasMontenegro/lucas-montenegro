import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { ReactComponent } from "./default-avatar.svg"
const useStyles = makeStyles(() => ({ // scale svg using the padding-bottom hack
  container: {
    backgroundColor: `#ffffff`,
    position: `relative`,
    height: 0,
    width: `100%`,
    padding: 0,
    paddingBottom: `100%`, // over-ride this inline for aspect ratio other than square
  },
  svg: {
    position: `absolute`,
    height: `100%`,
    width: `100%`,
    left: 0,
    right: 0,
  },
}), { name: `lib-react-account_applet-default_avatar` })
export default function DefaultAvatarSvg () {
  const classes = useStyles()
  return <div className={classes.container}><ReactComponent className={classes.svg} /></div>
}