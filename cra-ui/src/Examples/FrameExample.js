import React from "react"
import { Switch, Route } from "react-router-dom"
import Frame from "local/Frame"
const appNames = [`1`, `2`]
const languages = [`A`, `B`]
const make = {
  path: (lang, app) => `/examples/frame/lang${lang}/app${app}`,
  subtitle: (lang, app) => `App ${app} - Lang ${lang}`,
  content: (lang, app) => `This is the App ${app} in the Language ${lang}`,
  languageLinkText: lang => `Language ${lang}`,
  navLinkText: app => `App ${app}`,
}
const FrameExample = () => <Switch>
  {appNames.reduce((output, app) => languages.reduce((output, lang) => {
    output.push(<Route
      key={`${app}${lang}`}
      exact path={make.path(lang, app)}
      render={() => <Frame
        title="Lucas Montenegro"
        subtitle={make.subtitle(lang, app)}
        content={make.content(lang, app)}
        navLinks={appNames.map(_app => ({
          to: make.path(lang, _app),
          text: make.navLinkText(_app),
        }))}
        languageLinks={languages.map(_lang => ({
          to: make.path(_lang, app),
          text: make.languageLinkText(_lang),
        }))}
      />}
    />)
    return output
  }, output), [])}
</Switch>
export default FrameExample
