import React, { useState } from "react"
import { useAuth0, Auth0Provider } from "lib/react/auth0"
import Div from "lib/react/utils/Div"
import StringifyObject from "lib/react/utils/StringifyObject"
import Button from "@material-ui/core/Button"
import useProfiles from "../useProfiles"
import languageDetector from "lib/languageDetector"
import { Route } from "react-router-dom"
function Login () {
  const auth0 = useAuth0()
  return (
    <Div color="RoyalBlue">
      <h4>Auth0 Session</h4>
      <StringifyObject id="auth0" source={auth0} />
      <Div><Button onClick={auth0.login}>Login</Button></Div>
      <Div><Button onClick={auth0.logout}>Logout</Button></Div>
    </Div>
  )
}
function Example () {
  const [running, setRunning] = useState(false)
  const [logValue, setLogValue] = useState([])
  function log (value) {
    setLogValue(arr => [...arr, value])
  }
  function clear () {
    setLogValue([])
  }
  const profiles = useProfiles()
  function example () {
    ;(async () => {
      if (running) return
      clear()
      setRunning(true)
      log({
        query: `await profiles.createMine('foo')`,
        response: await profiles.createMine(`foo`),
      })
      log({
        query: `await profiles.readMine()`,
        response: await profiles.readMine(),
      })
      log({
        query: `await profiles.updateMine()`,
        response: await profiles.updateMine({
          name: `Foo`,
          surname: `Bar`,
          birthdate: new Date(),
        }),
      })
      log({
        query: `await profiles.readPublic('foo')`,
        response: await profiles.readPublic(`foo`),
      })
      log({
        query: `await profiles.deleteMine()`,
        response: await profiles.deleteMine(),
      })
      log(`finished`)
      setRunning(false)
    })().catch(err => {
      log(`error`)
      log(err)
      setRunning(false)
    })
  }
  return (
    <Div color="PaleRedViolet">
      <h4>Profile HTTP Service Example</h4>
      {running || <Div><Button onClick={example}>Execute</Button></Div>}
      <StringifyObject id="log" source={logValue} />
    </Div>
  )
}
const languageCodes = [`en`, `es`]
function getLogoutUrl () {
  return `${window.location.origin}/profiles/httpService/${languageDetector.get()}`
}
function Init (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    languageDetector.set(props.match.params.languageCode)
    return (
      <Auth0Provider getLogoutUrl={getLogoutUrl}>
        <Login />
        <Example />
      </Auth0Provider>
    )
  }
  return null
}
export default (<Route path="/profiles/httpService/:languageCode" component={Init} />)