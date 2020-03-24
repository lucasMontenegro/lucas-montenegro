import { useAuth0, Auth0Provider } from "../index.js"
import React, { useState, useCallback } from "react"
import Div from "lib/react/utils/Div"
import StringifyObject from "lib/react/utils/StringifyObject"
import Button from "@material-ui/core/Button"
import globals from "lib/utils/globals"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { Route } from "react-router-dom"
function UseAuth0 () {
  const auth0 = useAuth0()
  const [token, saveToken] = useState(null)
  async function getToken () {
    saveToken(await auth0.getTokenSilently({
      audience: process.env.REACT_APP_AUDIENCE,
      scope: `get_token:example`,
    }))
  }
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
        <Div><Button onClick={auth0.logout}>Log Out</Button></Div>
      </Div>
      <Div color="Crimson">
        <h5>Authorization Token</h5>
        <Div><Button onClick={getToken}>Get Token Silently</Button></Div>
        <StringifyObject id="authorization-token" source={token} />
      </Div>
    </Div>
  )
}
const languageCodes = [`en`, `es`]
function Init (props) {
  languageDetector.init(languageCodes)
  const { mode, languageCode } = props.match.params
  const getLogoutUrl = useCallback(() => (
    `${globals.window.location.origin}/react/auth0/${mode}/${languageCode}`
  ), [mode, languageCode])
  if (languageDetector.useReadyState()) {
    languageDetector.set(languageCode)
    return (
      <DarkModeContext.Provider value={{ value: mode === `dark` }}>
        <Theme>
          <CssBaseline />
          <Auth0Provider getLogoutUrl={getLogoutUrl}>
            <UseAuth0 />
          </Auth0Provider>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (<Route exact path="/react/auth0/:mode/:languageCode" component={Init} />)