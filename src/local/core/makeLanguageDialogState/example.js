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
import makeTranslations from "local/makeTranslations"
import makePathname from "./makePathname"
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
}, { name: `MakeLanguageDialogStateExample` })
const initialState = {
  languageCode: `en`,
  foo: `0`,
  location: { pathname: makePathname(`en`, `0`) },
}
const useLanguageDialogState = makeLanguageDialogState({
  initialLocation: initialState.location,
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
function MakeLanguageDialogStateExample () {
  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const { languageCode, foo, location } = state
  const pathname = makePathname(languageCode, foo)
  const languageDialogState = useLanguageDialogState(languageCode, location)
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
          <div>pathname: <span id="pathname">{pathname}</span></div>
          <div>
            isOpen: &nbsp;
            <span id="isOpen">{languageDialogState.isOpen ? `true` : `false`}</span>
          </div>
          <ul>
            {supportedLanguages.map(languageCode => (
              <li key={languageCode} id={`translation-${languageCode}`}>
                {languageDialogState.translations[languageCode].pathname}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardActions className={classes.actions}>
          {[
            { id: `open`, onClick: languageDialogState.open, text: `OPEN` },
            { id: `close`, onClick: languageDialogState.close, text: `CLOSE` },
            { id: `navigate`, onClick: update.location, text: `NAVIGATE` },
          ].map(({ id, onClick, text }) => (
            <Button
              key={id}
              id={id}
              variant="outlined"
              color="primary"
              onClick={onClick}
            >
              {text}
            </Button>
          ))}
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