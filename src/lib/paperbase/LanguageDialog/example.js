import React from "react"
import { Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import lightTheme from "lib/paperbase/themes/light"
import LanguageDialog from "lib/paperbase/LanguageDialog"
import languageDetector from "lib/languageDetector"
import CreateDestroy from "lib/utils/react/CreateDestroy"
const languageCodes = [`en`, `es`]
const rawLinks = [
  {
    languageCode: `en`,
    location: { pathname: `/paperbase/LanguageDialog/en` },
    otherProps: {
      key: `en`,
      id: `translate-to-en`,
      text: `English`,
    },
  },
  {
    languageCode: `es`,
    location: { pathname: `/paperbase/LanguageDialog/es` },
    otherProps: {
      key: `es`,
      id: `translate-to-es`,
      text: `Spanish`,
    },
  },
]
const links = languageCodes.reduce((links, currentLanguage) => {
  links[currentLanguage] = rawLinks.map(({ languageCode, location, otherProps }) => ({
    location: languageCode === currentLanguage ? null : location,
    otherProps,
  }))
  return links
}, {})
let count = 0
function getLinks () {
  console.log(`getLinks ${count}`)
  count++
  return links[languageDetector.get()]
}
function Example () {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar><Toolbar><LanguageDialog getLinks={getLinks}/></Toolbar></AppBar>
    </ThemeProvider>
  )
}
function Init (props) {
  languageDetector.init(languageCodes)
  const ready = languageDetector.useReadyState()
  if (ready) {
    languageDetector.set(props.match.params.currentLanguage)
    return (
      <div style={{ paddingTop: 48 }}>
        <CreateDestroy Component={Example} />
      </div>
    )
  }
  return null
}
export default (<Route path="/paperbase/LanguageDialog/:currentLanguage" component={Init} />)