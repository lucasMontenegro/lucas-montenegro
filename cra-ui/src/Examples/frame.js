import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Frame, { supportedLanguages } from "local/Frame"
const appNames = [`app1`, `app2`]
function FrameExampleRouter (props) {
  const { languageCode, appName } = props.match.params
  if (!hashtable.appNames[appName] || !hashtable.supportedLanguages[languageCode]) {
    return null
  }
  return (
    <Frame
      appName={appName}
      languageCode={languageCode}
      AppMenu={appMenus[appName]}
      appBodies={appBodies}
      navLinks={navLinks[languageCode].map(({ appName, text }) => ({
        key: appName,
        text,
        to: locations[appName].translated[languageCode],
      }))}
      languageLinks={languageLinks.map(({ languageCode, text }) => ({
        key: languageCode,
        text,
        to: locations[appName].translated[languageCode],
      }))}
      routerProps={props.routerProps}
    />
  )
}
const hashtable = {
  appNames: appNames.reduce((table, appName) => {
    table[appName] = true
    return table
  }, {}),
  supportedLanguages: supportedLanguages.reduce((table, languageCode) => {
    table[languageCode] = true
    return table
  }, {}),
}
const appMenus = appNames.reduce((appMenus, appName) => {
  appMenus[appName] = function AppMenu ({ languageCode, routerProps, Wrapper, wrapperProps }) {
    return (
      <Wrapper other={wrapperProps}>
        <div>{`menu ${languageCode} ${appName}`}</div>
      </Wrapper>
    )
  }
  return appMenus
}, {})
const appBodyStyles = {
  card: {
    maxWidth: `60ch`,
    margin: `2em 3ch`,
    padding: `1em 1ch`,
  },
}
const appBodies = appNames.map(appName => {
  function AppBody ({ classes, match, languageCode, Wrapper, wrapperProps }) {
    if (!match) {
      return null
    }
    return (
      <Wrapper subtitle={`subtitle ${languageCode} ${appName}`} other={wrapperProps}>
        <Paper elevation={1} className={classes.card}>
          <Typography variant="body1" component="p">
            {`app content ${languageCode} ${appName}`}
          </Typography>
          <Typography variant="body1" component="p">
            Aliqua ex dolor deserunt qui mollit ad reprehenderit ex ea id irure sit eu ullamco culpa nulla. Veniam labore quis esse nulla ut mollit reprehenderit exercitation enim mollit in dolore. Sed fugiat occaecat voluptate irure enim est laboris do quis mollit aliquip laborum excepteur est esse ut exercitation laboris. Esse minim voluptate mollit ex nulla in incididunt voluptate sunt duis. Consectetur minim duis consequat dolor minim voluptate incididunt proident pariatur est commodo.
          </Typography>
        </Paper>
      </Wrapper>
    )
  }
  return { appName, AppBody: withStyles(appBodyStyles)(AppBody) }
})
const navLinks = supportedLanguages.reduce((navLinks, languageCode) => {
  navLinks[languageCode] = appNames.map(appName => ({
    appName,
    text: `nav link ${languageCode} ${appName}`,
  }))
  return navLinks
}, {})
const languageLinks = supportedLanguages.map(languageCode => ({
  languageCode,
  text: `language link ${languageCode}`,
}))
const locations = appNames.reduce((locations, appName) => {
  locations[appName] = {
    original: null,
    translated: supportedLanguages.reduce((translated, languageCode) => {
      translated[languageCode] = {
        pathname: `/examples/frame/${languageCode}/${appName}`,
        search: ``,
        hash: ``,
      }
      return translated
    }, {}),
  }
  return locations
}, {})
const frameExample = (
  <Route
    key="frame"
    exact path="/examples/frame/:languageCode/:appName"
    render={FrameExampleRouter}
  />
)
export default frameExample