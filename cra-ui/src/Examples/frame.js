import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Frame, { supportedLanguageCodes } from "local/Frame"
const appNames = [`app1`, `app2`]
const makeContentComponent = appName => withStyles(
  {
    card: {
      maxWidth: `60ch`,
      margin: `2em 3ch`,
      padding: `1em 1ch`,
    },
  }
)(
  ({ classes, match, languageCode, Wrapper, wrapperProps }) => {
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
)
const makeMenuComponent = appName => ({ match, languageCode, Wrapper, wrapperProps }) => {
  if (!match) {
    return null
  }
  return (
    <Wrapper other={wrapperProps}>
      <div>{`menu ${languageCode} ${appName}`}</div>
    </Wrapper>
  )
}
const apps = appNames.map(appName => ({
  name: appName,
  Content: makeContentComponent(appName),
  Menu: makeMenuComponent(appName),
}))
const renderLists = appNames.reduce((renderLists, appName) => {
  renderLists[appName] = apps.map(app => ({ ...app, match: appName === app.name }))
  return renderLists
}, {})
const make = {
  path: (languageCode, appName) => `/examples/frame/${languageCode}/${appName}`,
  languageLinkText: (languageCode, appName) => `language link ${languageCode} ${appName}`,
  navLinkText: (languageCode, appName) => `nav link ${languageCode} ${appName}`,
}
const propsByLang = supportedLanguageCodes.reduce((propsByLang, languageCode) => {
  propsByLang[languageCode] = appNames.reduce((propsByApp, appName) => {
    propsByApp[appName] = {
      languageCode,
      render: renderLists[appName],
      navLinks: appNames.map(_appName => ({
        key: _appName,
        to: make.path(languageCode, _appName),
        text: make.navLinkText(languageCode, _appName),
      })),
      languageLinks: supportedLanguageCodes.map(_languageCode => ({
        key: _languageCode,
        to: make.path(_languageCode, appName),
        text: make.languageLinkText(_languageCode, appName),
      })),
    }
    return propsByApp
  }, {})
  return propsByLang
}, {})
const MainRouter = props => {
  const { lang, app } = props.match.params
  const propsByApp = propsByLang[lang]
  if (!propsByApp) return null
  const frameProps = propsByApp[app]
  if (!frameProps) return null
  return <Frame {...frameProps} routerProps={props} />
}
const frameExample = <Route exact path="/examples/frame/:lang/:app" render={MainRouter} />
export default frameExample