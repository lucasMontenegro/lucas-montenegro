import React, { useState } from "react"
import { Auth0Context } from "lib/react/auth0"
import Toolbar from "@material-ui/core/Toolbar"
import AccessButton from "./index.js"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { Route } from "react-router-dom"
function Example () {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Auth0Context.Provider
      value={{
        user: loggedIn ? {} : null,
        login () {
          setLoggedIn(true)
          console.log(`auth0.login`)
        },
        logout () {
          window.location.reload()
        },
      }}
    >
      <Toolbar>
        <AccessButton closeDashboard={() => console.log(`closeDashboard`)} />
      </Toolbar>
    </Auth0Context.Provider>
  )
}
const languageCodes = [`en`, `es`]
function Init (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    const { params } = props.match
    languageDetector.set(params.languageCode)
    return (
      <DarkModeContext.Provider value={{ value: params.mode === `dark` }}>
        <Theme>
          <CssBaseline />
          <Example />
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
export default (<Route exact path="/react/AccessButton/:mode/:languageCode" component={Init} />)