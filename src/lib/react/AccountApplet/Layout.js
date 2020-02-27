import { makeStyles } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import Typography from "@material-ui/core/Typography"
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    display: `flex`,
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    margin: theme.spacing(1),
    borderRadius: `50%`,
    overflow: `hidden`,
  },
  text: {
    height: theme.spacing(8),
    margin: theme.spacing(1),
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
  },
  topText: {
    marginBottom: theme.spacing(0.75),
  },
}), { name: `lib-react-account_applet-layout` })
export default function Layout (props) {
  const classes = useStyles()
  const { text } = props
  return (
    <div className={classes.root}>
      <div className={classes.avatar}>{props.avatar}</div>
      <div className={classes.text}>
        {
          text ? <div>{text}</div> :
          (
            <Fragment>
              <Typography className={classes.topText} noWrap component="div" variant="body1">
                {props.topText}
              </Typography>
              <div>{props.bottomText}</div>
            </Fragment>
          )
        }
      </div>
    </div>
  )
}