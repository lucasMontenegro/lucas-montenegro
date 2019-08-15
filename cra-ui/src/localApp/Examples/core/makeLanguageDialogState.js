import React, { useState } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import makeLanguageDialogState from "local/core/makeLanguageDialogState"
import supportedLanguages from "local/supportedLanguages"
import translators from "./translations"
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
const useLanguageDialogState = makeLanguageDialogState(initialLocation, translators)
const initialState = { languageCode: `en`, foo: `0`, location: initialLocation }
function MakeLanguageDialogStateExample () {
  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const { languageCode, foo, location } = state
  const languageDialogState = useLanguageDialogState(languageCode, location)
  const pathname = `/examples/core/router/${languageCode}/example/${foo}`
  const update = {
    languageCode (e) {
      const languageCode = e.target.value
      setState(state => ({ ...state, languageCode }))
    },
    foo (e) {
      const foo = e.target.value
      setState(state => ({ ...state, foo }))
    },
    location () {
      setState(state => ({ ...state, location: { pathname } }))
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
          <div>pathname: <span id="pathname">{pathname}</span></div>
          <div>
            isOpen: &nbsp;
            <span id="isOpen">{languageDialogState.isOpen ? `true` : `false`}</span>
          </div>
          <ul>
            {supportedLanguages.map(languageCode => (
              <li key={languageCode} id={`pathname-${languageCode}`}>
                {languageDialogState.translations[languageCode].pathname}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            id="open"
            variant="outlined"
            color="primary"
            onClick={languageDialogState.open}
          >
            OPEN
          </Button>
          <Button
            id="close"
            variant="outlined"
            color="primary"
            onClick={languageDialogState.close}
          >
            CLOSE
          </Button>
          <Button
            id="navigate"
            variant="outlined"
            color="primary"
            onClick={update.location}
          >
            NAVIGATE
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
export default (
  <Route
    exact path="/examples/core/makeLanguageDialogState"
    component={MakeLanguageDialogStateExample}
  />
)