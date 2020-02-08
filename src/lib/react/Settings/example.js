import React from "react"
import Div from "lib/react/utils/Div"
import Settings from "./index.js"
import Button from "@material-ui/core/Button"
import languageDetector from "lib/languageDetector"
import DarkMode from "lib/react/DarkMode"
import Theme from "lib/react/Theme"
import CssBaseline from "lib/react/CssBaseline"
import { RoutingContext } from "lib/react/routing/context"
import { Route } from "react-router-dom"
const languageCodes = [`en`, `es`]
function Example () {
  return (
    <Div>
      <Settings>
        {open => (
          <Button id="open-settings-dialog" onClick={open} aria-controls="lib-react-settings">
            Settings
          </Button>
        )}
      </Settings>
    </Div>
  )
}
const baseLinks = [
  { languageCode: `en`, text: `English` },
  { languageCode: `es`, text: `Spanish` },
]
function Init (props) {
  languageDetector.init(languageCodes)
  if (languageDetector.useReadyState()) {
    const { currentLanguage } = props.match.params
    languageDetector.set(currentLanguage)
    return (
      <DarkMode>
        <Theme>
          <CssBaseline />
          <RoutingContext.Provider
            value={{
              getTranslationLinks: () => (
                baseLinks.filter(link => link.languageCode !== currentLanguage).map(link => {
                  const { languageCode } = link
                  return {
                    languageCode,
                    location: { pathname: `/react/Settings/${languageCode}` },
                    text: link.text,
                  }
                })
              ),
            }}
          >
            <Example />
          </RoutingContext.Provider>
        </Theme>
      </DarkMode>
    )
  }
  return null
}
export default (<Route exact path="/react/Settings/:currentLanguage" component={Init} />)