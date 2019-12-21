import Translation from "./index.js"
import React, { useState } from "react"
import Div from "lib/react/utils/Div"
import TextField from "@material-ui/core/TextField"
import GetValue from "lib/react/utils/GetValue"
import languageDetector from "lib/languageDetector"
import { Route } from "react-router-dom"
const languageCodes = [`en`, `es`, `pt`]
const translation = new  Translation({
  en: `English`,
  es: `Español`,
})
function DisplayName () {
  const [languageCode, saveLanguageCode] = useState(``)
  const [displayName, saveDisplayName] = useState(``)
  return (
    <div>
      <Div color="Teal">
        <TextField
          id="language-code"
          label="Language Code"
          type="text"
          size="40"
          value={languageCode}
          onChange={e => saveLanguageCode(e.target.value)}
        />
      </Div>
      <GetValue
        id="translation.get()"
        value={displayName}
        onClick={() => {
          languageDetector.set(languageCode)
          saveDisplayName(translation.get())
        }}
      />
    </div>
  )
}
function Example () {
  languageDetector.init(languageCodes)
  return languageDetector.useReadyState() ? <DisplayName /> : null
}
export default (<Route exact path="/Translation" component={Example} />)