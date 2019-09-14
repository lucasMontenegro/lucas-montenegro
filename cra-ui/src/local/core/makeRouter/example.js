import React, { useState, useRef, useLayoutEffect, Fragment } from "react"
import { Route } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import makeLanguageDetector from "./makeLanguageDetector"
import i18next from "i18next"
const MakeLanguageDetectorExample = (useStyles => function MakeLanguageDetectorExample () {
  const classes = useStyles()
  const [mounted, setMounted] = useState(true)
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <DetectedLanguage />
          {mounted && <UseLanguageDetector />}
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            id="toggleMounted"
            variant="outlined"
            color="primary"
            onClick={() => setMounted(mounted => !mounted)}
          >
            TOGGLE MOUNTED
          </Button>
        </CardActions>
      </Card>
    </div>
  )
})(makeStyles({
  root: {
    padding: 16,
  },
  card: {
    width: `90%`,
    minWidth: 400,
    maxWidth: 800,
    margin: `0 auto`,
  },
}, { name: `MakeLanguageDetectorExample` }))
export default (
  <Route
    exact path="/examples/core/makeRouter/makeLanguageDetector"
    component={MakeLanguageDetectorExample}
  />
)
function DetectedLanguage () {
  const [detectedLanguage, setDetectedLanguage] = useState(null)
  useLayoutEffect(() => {
    i18next.on(`languageChanged`, setDetectedLanguage)
    return () => i18next.off(`languageChanged`, setDetectedLanguage)
  }, [])
  return <div>detectedLanguage: <span id="detectedLanguage">{detectedLanguage}</span></div>
}
const useLanguageDetector = makeLanguageDetector()
function UseLanguageDetector () {
  const [detectedLanguage, setDetectedLanguage] = useLanguageDetector()
  const detectedLanguagesList = useRef([])
  const [count, setCount] = useState(1)
  detectedLanguagesList.current.push({
    id: `detectedLanguage${detectedLanguagesList.current.length}`,
    type: detectedLanguage === null ? `null` : typeof detectedLanguage,
    text: detectedLanguage,
  })
  return (
    <Fragment>
      <div>count: <span id="count">{count}</span></div>
      <div>
        <Button
          id="updateCount"
          variant="outlined"
          color="primary"
          onClick={() => setCount(count => count + 1)}
        >
          UPDATE COUNT
        </Button>
      </div>
      <ol>
        {detectedLanguagesList.current.map(({ id, type, text }) => (
          <li key={id} id={id}>
            <div>type: <span className="type">{type}</span></div>
            <div>text: <span className="text">{text}</span></div>
          </li>
        ))}
      </ol>
      <SetDetectedLanguage callback={setDetectedLanguage} />
    </Fragment>
  )
}
const SetDetectedLanguage = (useStyles => function SetDetectedLanguage ({ callback }) {
  const [languageCode, setLanguageCode] = useState(``)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TextField
        id="languageCode"
        label="languageCode"
        value={languageCode}
        onChange={e => setLanguageCode(e.target.value)}
        margin="normal"
      />
      <div>
        <Button
          id="setDetectedLanguage"
          variant="outlined"
          color="primary"
          onClick={() => callback(languageCode)}
        >
          SET DETECTED LANGUAGE
        </Button>
      </div>
    </div>
  )
})(makeStyles(theme => ({
  root: {
    padding: 8,
    border: `2px solid ${theme.palette.primary.main}`
  },
}), { name: `SetDetectedLanguage` }))
