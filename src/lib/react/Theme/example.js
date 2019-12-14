import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import CommuteIcon from "@material-ui/icons/Commute"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "./index.js"
import { Route } from "react-router-dom"
const useCardStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6),
  },
  content: {
    color: `#0000ff`,
  },
  buttonsWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "& > *": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}), { name: `lib-react-theme-example-card` })
function CardExample (props) {
  const classes = useCardStyles()
  return (
    <Card elevation={props.elevation} className={classes.root}>
      <CardHeader title={`Card (elevation=${props.elevation})`} />
      <CardContent className={classes.content}>
        {[
          undefined,
          `initial`,
          `inherit`,
          `primary`,
          `secondary`,
          `textPrimary`,
          `textSecondary`,
          `error`,
        ].map(color => {
          const text = `Typography (color=${color || `undefined`})`
          return <Typography key={text} color={color}>{text}</Typography>
        })}
        {[undefined, `default`, `inherit`, `primary`, `secondary`].map(color => {
          const title = `Button (color=${color || `undefined`})`
          return (
            <div key={title} className={classes.buttonsWrapper}>
              {[undefined, `text`, `outlined`, `contained`].map(variant => (
                <Tooltip title={title} key={variant || `undefined`}>
                  <Button color={color} variant={variant}>lorem</Button>
                </Tooltip>
              ))}
            </div>
          )
        })}
        <Toolbar>
          {[undefined, `default`, `inherit`, `primary`, `secondary`].map(color => {
            const title = `IconButton (color=${color || `undefined`})`
            return (
              <Tooltip key={title} title={title}>
                <IconButton color={color}><CommuteIcon /></IconButton>
              </Tooltip>
            )
          })}
        </Toolbar>
      </CardContent>
    </Card>
  )
}
const useBodyStyles = makeStyles(theme => ({
  root: {
    minHeight: `100vh`,
    backgroundColor: theme.palette.background.default,
    padding: 1,
  },
}), { name: `lib-react-theme-example-body` })
function Body (props) {
  return <div className={useBodyStyles().root}>{props.children}</div>
}
function Example (props) {
  return (
    <DarkModeContext.Provider value={{ value: props.match.params.mode === `dark` }}>
      <Theme>
        <Body>
          <CardExample elevation={1} />
          <CardExample elevation={5} />
        </Body>
      </Theme>
    </DarkModeContext.Provider>
  )
}
export default (<Route exact path="/react/Theme/:mode" component={Example} />)