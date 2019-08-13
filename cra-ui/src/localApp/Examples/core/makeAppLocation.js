import React, { useState, Fragment } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import makeAppLocation from "local/core/makeAppLocation"
import translations from "./translations"
import initialLocation from "./initialLocation"
const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  card: {
    width: 512,
    margin: `0 auto`,
  },
  content: {
    "& > *": {
      display: `block`,
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
})
const useAppLocation = makeAppLocation(initialLocation, translations)
const initialState = {
  languageCode: `en`,
  foo: ``,
  mounted: false,
  props: {
    match: false,
    languageCode: `en`,
    location: { pathname: `/examples/core/router/en/home` },
  },
}
function MakeAppLocationExample () {
  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const { languageCode, foo, mounted } = state
  const match = /^\d+$/.test(foo)
  const pathname = `/examples/core/router/${languageCode}/${match ? `example/${foo}` : `home`}`
  const update = {
    languageCode (e) {
      const languageCode = e.target.value
      setState(state => ({ ...state, languageCode }))
    },
    foo (e) {
      const foo = e.target.value
      setState(state => ({ ...state, foo }))
    },
    mounted () {
      setState(state => ({ ...state, mounted: !state.mounted }))
    },
    props () {
      setState(state => ({ ...state, props: { match, languageCode, location: { pathname } } }))
    }
  }
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <TextField
            id="languageCode"
            label="languageCode"
            value={languageCode}
            onChange={update.languageCode}
            margin="normal"
          />
          <TextField
            id="foo"
            label="foo"
            value={foo}
            onChange={update.foo}
            margin="normal"
          />
          <div>match: <span id="match">{match ? `true` : `false`}</span></div>
          <div>mounted: <span id="mounted">{mounted ? `true` : `false`}</span></div>
          {mounted && <MakeAppLocation {...state.props} />}
        </CardContent>
        <CardActions className={classes.actions}>
          <Button id="navigate" variant="outlined" color="primary" onClick={update.props}>
            NAVIGATE
          </Button>
          <Button id="toggleMounted" variant="outlined" color="primary" onClick={update.mounted}>
            MOUNT/UNMOUNT
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
export default (
  <Route exact path="/examples/core/makeAppLocation" component={MakeAppLocationExample} />
)
function MakeAppLocation ({ match, languageCode, location }) {
  const appLocation = useAppLocation(match, languageCode, location)
  return (
    <Fragment>
      <div>location.pathname: <span id="pathname">{location.pathname}</span></div>
      <div>appLocation.pathname: <span id="appPathname">{appLocation.pathname}</span></div>
    </Fragment>
  )
}