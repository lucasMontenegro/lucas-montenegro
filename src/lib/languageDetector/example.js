import React, { useState, Fragment } from "react"
import { Route } from "react-router-dom"
import languageDetector from "lib/languageDetector"
import Div from "lib/utils/react/Div"
import GetValue from "lib/utils/react/GetValue"
import SetValue from "lib/utils/react/SetValue"
import CreateDestroy from "lib/utils/react/CreateDestroy"
function LanguageDetector () {
  const [detectorGet, setDetectorGet] = useState(null)
  const [count, setCount] = useState(0)
  const ready = languageDetector.useReadyState()
  return (
    <Div className="LanguageDetector" color="green">
      <h5>languageDetector</h5>
      <SetValue
        className="init"
        value="[`en`, `es`]"
        onClick={() => languageDetector.init([`en`, `es`])}
      />
      <GetValue
        className="get"
        value={detectorGet}
        onClick={() => {
          setDetectorGet(languageDetector.get())
        }}
      />
      {[`en`, `es`].map(languageCode => (
        <SetValue
          className={`set-${languageCode}`}
          value={languageCode}
          onClick={() => languageDetector.set(languageCode)}
        />
      ))}
      <GetValue
        className="count"
        value={count}
        onClick={() => setCount(count => count + 1)}
      />
      <Div color="purple">
        useReadyState:
        &nbsp;
        <span className="useReadyState">{JSON.stringify(ready)}</span>
      </Div>
    </Div>
  )
}
function Example () {
  const box = 900
  return (
    <Fragment>
      <CreateDestroy id="languageDetector1" box={box} Component={LanguageDetector} />
      <CreateDestroy id="languageDetector2" box={box} Component={LanguageDetector} />
    </Fragment>
  )
}
export default (<Route exact path="/languageDetector" component={Example} />)