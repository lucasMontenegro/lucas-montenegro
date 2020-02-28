import React, { useState } from "react"
import { Auth0Context } from "lib/react/auth0"
import AccountApplet from "./index.js"
import languageDetector from "lib/languageDetector"
import { DarkModeContext } from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import Drawer from "@material-ui/core/Drawer"
import { Switch, Redirect, Route } from "react-router-dom"
function Example (props) {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Auth0Context.Provider
      value={{
        user: loggedIn ? props.user : null,
        login: () => setLoggedIn(true),
        logout: () => setLoggedIn(false),
      }}
    >
      <AccountApplet closeDashboard={() => console.log(`closeDashboard`)} />
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
          <Drawer variant="permanent" PaperProps={{ style: { width: 256 } }}>
            <Example user={{}} />
            {/**}
            <Example user={{ profile_id: `` }} />
            {/**/}
          </Drawer>
        </Theme>
      </DarkModeContext.Provider>
    )
  }
  return null
}
function Routing () {
  return (
    <Switch>
      <Redirect exact from="/react/AccountApplet" to="/react/AccountApplet/light/en" />
      {/**}
      <Route exact path="/react/AccountApplet/profile/create" component={CreateProfile} />
      <Route exact path="/react/AccountApplet/profile/xyz" component={Profile} />
      {/**/}
      <Route exact path="/react/AccountApplet/:mode/:languageCode" component={Init} />
    </Switch>
  )
}
export default (<Route path="/react/AccountApplet" component={Routing} />)