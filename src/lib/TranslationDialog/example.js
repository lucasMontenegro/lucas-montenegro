import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import languageDetector from "lib/languageDetector"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import TranslationDialog from "lib/TranslationDialog"
import { ThemeProvider } from "@material-ui/styles"
import themes from "lib/paperbase"
import { Route } from "react-router-dom"
const languageCodes = [`en`, `es`]
const otherProps = {
  en: {
    key: `en`,
    id: `translate-to-en`,
    text: `English`,
  },
  es: {
    key: `es`,
    id: `translate-to-es`,
    text: `Spanish`,
  },
}
const links = [`dark`, `light`].reduce((links, themeName) => {
  links[themeName] = languageCodes.reduce((byLanguage, oldLanguage) => {
    byLanguage[oldLanguage] = languageCodes.map(newLanguage => ({
      languageCode: newLanguage,
      location: (
        newLanguage === oldLanguage ? null :
        { pathname: `/TranslationDialog/${themeName}/${newLanguage}` }
      ),
      otherProps: otherProps[newLanguage],
    }))
    return byLanguage
  }, {})
  return links
}, {})
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: `100vh`,
    backgroundColor: theme.palette.background.default,
  },
}))
let count = 0
function Example ({ themeName }) {
  function getLinks () {
    console.log(`getLinks ${count}`)
    count++
    return links[themeName][languageDetector.get()]
  }
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar><Toolbar><TranslationDialog getLinks={getLinks}/></Toolbar></AppBar>
    </div>
  )
}
function Init (props) {
  languageDetector.init(languageCodes)
  const ready = languageDetector.useReadyState()
  if (ready) {
    const { themeName, currentLanguage } = props.match.params
    languageDetector.set(currentLanguage)
    return (
      <ThemeProvider theme={themes[themeName].body || themes.light.body}>
        <Example themeName={themeName} />
      </ThemeProvider>
    )
  }
  return null
}
export default (
  <Route exact path="/TranslationDialog/:themeName/:currentLanguage" component={Init} />
)