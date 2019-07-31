import React from "react"
import { Route } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import supportedLanguages from "local/supportedLanguages"
import LanguageMenu from "local/core/LanguageMenu"
import { Link } from "local/core/links"
import translations from "./translations"
const languages = supportedLanguages.reduce((obj, key) => obj[key] = true && obj, {})
function LanguageMenuExample (props) {
  const { languageCode, foo } = props.match.params
  return (
    <div style={{ paddingTop: `100px` }}>
      <AppBar>
        <Toolbar>
          {languages[languageCode] && (
            <span id="language-menu-wrapper">
              <LanguageMenu
                languageCode={languageCode}
                location={{
                  pathname: `/examples/core/routingMountPoint/${languageCode}/example/${foo}`,
                }}
                translations={translations}
              />
            </span>
          )}
        </Toolbar>
      </AppBar>
      <ul>
        {supportedLanguages.map(languageCode => (
          <li key={languageCode}>
            <Link
              id={`go-to-${languageCode}`}
              to={`/examples/core/LanguageMenu/${languageCode}/${foo}`}
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
    exact path="/examples/core/LanguageMenu/:languageCode/:foo"
    component={LanguageMenuExample}
  />
)