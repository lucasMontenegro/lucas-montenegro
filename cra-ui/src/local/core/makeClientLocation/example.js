import React, { useState, Fragment } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import makeTranslations from "local/makeTranslations"
import makeClientLocation from "local/core/makeClientLocation"
import makePathname from "./makePathname"
import PropTypes from "prop-types"
import { languageCodePropType } from "local/supportedLanguages"
import makeLocationPropType from "local/core/propTypes/makeLocationPropType"
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
}, { name: `MakeClientLocationExample` })
const useClientLocation = makeClientLocation({
  initialLocation: { pathname: makePathname.example(`en`, `0`) },
  linkTranslators: makeTranslations(languageCode => {
    const str = `/${languageCode}/example/`
    const re = new RegExp(`^.{${str.length}}(\\d+)$`)
    return {
      toIntl({ pathname }) {
        return re.exec(pathname)[1]
      },
      toLocal(foo) {
        return { pathname: `${str}${foo}` }
      },
    }
  }),
})
const initialState = {
  languageCode: `en`,
  foo: `0`,
  mounted: true,
  props: {
    match: false,
    languageCode: `en`,
    location: { pathname: makePathname.home(`en`) },
  },
}
function MakeClientLocationExample () {
  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const { languageCode, foo, mounted } = state
  const match = /^\d+$/.test(foo)
  const pathname = (
    match ? makePathname.example(languageCode, foo) : makePathname.home(languageCode)
  )
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
    },
  }
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          {[
            { name: `languageCode`, value: languageCode },
            { name: `foo`, value: foo },
          ].map(({ name, value }) => (
            <TextField
              key={name}
              id={name}
              label={name}
              value={value}
              onChange={update[name]}
              margin="normal"
            />
          ))}
          <div>match: <span id="match">{match ? `true` : `false`}</span></div>
          <div>mounted: <span id="mounted">{mounted ? `true` : `false`}</span></div>
          {mounted && <UseClientLocation {...state.props} />}
        </CardContent>
        <CardActions className={classes.actions}>
          {[
            { id: `navigate`, onClick: update.props, text: `NAVIGATE` },
            { id: `toggleMounted`, onClick: update.mounted, text: `MOUNT/UNMOUNT` },
          ].map(({ id, onClick, text }) => (
            <Button key={id} id={id} variant="outlined" color="primary" onClick={onClick}>
              {text}
            </Button>
          ))}
        </CardActions>
      </Card>
    </div>
  )
}
export default (
  <Route exact path="/examples/core/makeClientLocation" component={MakeClientLocationExample} />
)
function UseClientLocation ({ match, languageCode, location }) {
  const clientLocation = useClientLocation(match, languageCode, location)
  return (
    <Fragment>
      <div>location.pathname: <span id="pathname">{location.pathname}</span></div>
      <div>
        clientLocation.pathname: &nbsp;
        <span id="clientPathname">{clientLocation.pathname}</span>
      </div>
    </Fragment>
  )
}
UseClientLocation.propTypes = {
  match: PropTypes.bool.isRequired,
  languageCode: languageCodePropType.isRequired,
  location: makeLocationPropType().isRequired,
}