import { useAuth0, Auth0Provider } from "./index.js"
import React from "react"
import Div from "lib/react/utils/Div"
import StringifyObject from "lib/react/utils/StringifyObject"
import Button from "@material-ui/core/Button"
import globals from "lib/utils/globals"
import languageDetector from "lib/languageDetector"
import { Route } from "react-router-dom"
function UseAuth0 () {
  const auth0 = useAuth0()
  return (
    <Div>
      <h4>Auth0 Context</h4>
      <StringifyObject id="auth0-context-value" source={auth0} />
      <Div color="RoyalBlue">
        <Div>
          <Button variant="contained" color="primary" onClick={auth0.login}>
            Log In
          </Button>
        </Div>
        <Div>
          <Button variant="contained" color="secondary" onClick={auth0.logout}>
            Log Out
          </Button>
        </Div>
      </Div>
    </Div>
  )
}
const languageCodes = [`en`, `es`]
function onLoginPopupTimeout () {
  console.log(`onLoginPopupTimeout`)
}
function getLogoutUrl () {
  return `${globals.window.location.origin}/react/auth0/${languageDetector.get()}`
}
function Init (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    languageDetector.set(props.match.params.languageCode)
    return (
      <Auth0Provider onLoginPopupTimeout={onLoginPopupTimeout} getLogoutUrl={getLogoutUrl}>
        <UseAuth0 />
      </Auth0Provider>
    )
  }
  return null
}
export default (<Route exact path="/react/auth0/:languageCode" component={Init} />)