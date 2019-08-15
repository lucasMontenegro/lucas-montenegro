import React, { useState, Fragment } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import makeRouter from "local/core/makeRouter"
import routing from "./routing"
const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  card: {
    width: `90%`,
    minWidth: 400,
    maxWidth: 800,
    margin: `0 auto`,
  },
  content: {
    "& > *": {
      margin: `16px 0`,
    },
  },
  actions: {
    alignItems: `flex-end`,
    padding: 24,
    "& > *": {
      margin: `0 8px`,
    },
  },
}, { name: `MakeRouterExample` })
const initialLocation = { pathname: `` }
function MakeRouterExample (props) {
  const classes = useStyles()
  const [pathname, setPathname] = useState(``)
  function updatePathname (e) {
    setPathname(e.target.value)
  }
  const [location, setLocation] = useState(initialLocation)
  function updateLocation () {
    setLocation({ pathname })
  }
  const [mounted, setMounted] = useState(true)
  function toggleMounted () {
    setMounted(mounted => !mounted)
  }
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div>mounted: <span id="mounted">{mounted ? `true` : `false`}</span></div>
          {mounted && <MakeRouter location={location} />}
        </CardContent>
        <CardActions className={classes.actions}>
          <TextField
            id="input"
            label="Url"
            value={pathname}
            onChange={updatePathname}
            margin="normal"
          />
          <Button id="navigate" variant="outlined" color="primary" onClick={updateLocation}>
            NAVIGATE
          </Button>
          <Button id="toggleMounted" variant="outlined" color="primary" onClick={toggleMounted}>
            MOUNT/UNMOUNT
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
export default (<Route path="/examples/core/makeRouter" component={MakeRouterExample} />)
const useRouter = makeRouter(routing)
function MakeRouter (props) {
  const match = useRouter(props.location)
  if (match.type === `booting`) {
    return null
  }
  return (
    <Fragment>
      <div>type: <span id="type">{match.type}</span></div>
      <div>appName: <span id="appName">{match.appName || `null`}</span></div>
      <div>languageCode: <span id="languageCode">{match.languageCode || `null`}</span></div>
      <div>
        pathname: &nbsp;
        <span id="pathname">{match.location ? match.location.pathname : `null`}</span>
      </div>
      <div>
        referrer: &nbsp;
        <span id="referrer">
          {(
            match.location && match.location.state && match.location.state.referrer
          ) ? match.location.state.referrer.pathname : `null`}
        </span>
      </div>
    </Fragment>
  )
}