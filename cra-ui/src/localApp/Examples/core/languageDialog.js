import React from "react"
import { Route } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import supportedLanguages from "local/supportedLanguages"
import LanguageDialog from "local/core/LanguageDialog"
import { Link } from "local/core/links"
import translations from "./translations"
const languages = supportedLanguages.reduce((obj, key) => obj[key] = null || obj, {})
function LanguageDialogExample (props) {
  const { languageCode, foo } = props.match.params
  if (!(languageCode in languages)) {
    return null
  }
  return (
    <div style={{ paddingTop: `100px` }}>
      <AppBar>
        <Toolbar>
          <LanguageDialog
            languageCode={languageCode}
            location={{ pathname: `/examples/core/router/${languageCode}/example/${foo}` }}
            translations={translations}
          />
        </Toolbar>
      </AppBar>
      <ul>
        {supportedLanguages.map(languageCode => (
          <li key={languageCode}>
            <Link
              id={`go-to-${languageCode}`}
              to={`/examples/core/LanguageDialog/${languageCode}/${foo}`}
            >
              go to {languageCode}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default (
  <Route
    exact path="/examples/core/LanguageDialog/:languageCode/:foo"
    component={LanguageDialogExample}
  />
)