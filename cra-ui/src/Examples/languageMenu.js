import React from "react"
import { Route } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import LanguageMenu from "local/LanguageMenu"
import { Button } from "local/links"
import translations from "./linkTranslations"
const languageCodes = [`en`, `es`]
class LanguageMenuExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = { n: 0 }
    this.switchLanguage = this.switchLanguage.bind(this)
  }
  switchLanguage () {
    this.setState(state => {
      const n = state.n + 1
      return { ...state, n: n < languageCodes.length ? n : 0 }
    })
  }
  render () {
    const languageCode = languageCodes[this.state.n]
    return (
      <AppBar>
        <Toolbar>
          <Button id="switchLanguage" variant="contained" onClick={this.switchLanguage}>
            SWITCH LANGUAGE
          </Button>
          <span id={`language-menu-wrapper`}>
            <LanguageMenu
              languageCode={languageCode}
              location={{ pathname: `/examples/router/${languageCode}/example` }}
              translations={translations}
            />
          </span>
        </Toolbar>
      </AppBar>
    )
  }
}
export default (<Route exact path="/examples/languageMenu" component={LanguageMenuExample} />)