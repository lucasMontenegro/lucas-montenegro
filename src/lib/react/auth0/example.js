import { useAuth0, Auth0Provider } from "./index.js"
import React from "react"
import Div from "lib/react/utils/Div"
import StringifyObject from "lib/react/utils/StringifyObject"
import Button from "@material-ui/core/Button"
import languageDetector from "lib/languageDetector"
import { Route } from "react-router-dom"
function Example () {
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
const onLoginPopupTimeout = () => console.log(`onLoginPopupTimeout`)
function Init (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    const { languageCode } = props.match.params
    languageDetector.set(languageCode)
    return (
      <Auth0Provider
        redirectUri={hostname => `${hostname}/react/auth0/${languageCode}`}
        onLoginPopupTimeout={onLoginPopupTimeout}
      >
        <Example />
      </Auth0Provider>
    )
  }
  return null
}
export default (<Route exact path="/react/auth0/:languageCode" component={Init} />)