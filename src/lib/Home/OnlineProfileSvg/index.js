import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { ReactComponent as DarkSvg } from "./dark.svg"
import { ReactComponent as LightSvg } from "./light.svg"
const useStyles = makeStyles(theme => ({ // scale svg using the padding-bottom hack
  container: {
    position: `relative`,
    height: 0,
    width: `100%`,
    padding: 0,
    paddingBottom: `46.875%`,
  },
  svg: {
    position: `absolute`,
    height: `100%`,
    width: `100%`,
    left: 0,
    right: 0,
  },
}), { name: `lib-home-online_profile_svg` })
export default function OnlineProfileSvg (props) {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {props.isDark ? <DarkSvg className={classes.svg} /> : <LightSvg className={classes.svg} />}
    </div>
  )
}