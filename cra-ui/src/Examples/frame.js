import React from "react"
import { Route } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Frame from "local/Frame"
const appNames = [`1`, `2`]
const languages = [`A`, `B`]
const make = {
  path: (lang, app) => `/examples/frame/lang${lang}/app${app}`,
  subtitle: (lang, app) => `App ${app} - Lang ${lang}`,
  Content: withStyles(
    {
      card: {
        maxWidth: `60ch`,
        margin: `2em 3ch`,
        padding: `1em 1ch`,
      },
    }
  )(
    ({ classes, lang, app }) => (
      <Paper elevation={1} className={classes.card}>
        <Typography variant="body1" component="p">
          This is the App {app} in the Language {lang}
        </Typography>
        <Typography variant="body1" component="p">
          Aliqua ex dolor deserunt qui mollit ad reprehenderit ex ea id irure sit eu ullamco culpa nulla. Veniam labore quis esse nulla ut mollit reprehenderit exercitation enim mollit in dolore. Sed fugiat occaecat voluptate irure enim est laboris do quis mollit aliquip laborum excepteur est esse ut exercitation laboris. Esse minim voluptate mollit ex nulla in incididunt voluptate sunt duis. Consectetur minim duis consequat dolor minim voluptate incididunt proident pariatur est commodo.
        </Typography>
      </Paper>
    )
  ),
  languageLinkText: lang => `Language ${lang}`,
  navLinkText: app => `App ${app}`,
}
const props = languages.reduce((props, lang) => {
  props[lang] = appNames.reduce((byLang, app) => {
    const byApp = byLang[app] = {}
    byApp.subtitle = make.subtitle(lang, app)
    byApp.content = <make.Content lang={lang} app={app} />
    byApp.navLinks = appNames.map(_app => ({
      to: make.path(lang, _app),
      text: make.navLinkText(_app),
    }))
    byApp.languageLinks = languages.map(_lang => ({
      to: make.path(_lang, app),
      text: make.languageLinkText(_lang),
    }))
    return byLang
  }, {})
  return props
}, {})
const frameExample = (
  <Route
    key="frame-example"
    exact path="/examples/frame/:lang/:app"
    children={routerProps => {
      const { app: _app, lang: _lang } = routerProps.match.params
      const app = _app.charAt(_app.length - 1)
      const lang = _lang.charAt(_lang.length - 1)
      const byLang = props[lang]
      if (!byLang) return null
      const byApp = byLang[app]
      if (!byApp) return null
      return <Frame {...byApp} />
    }}
  />
)
export default frameExample