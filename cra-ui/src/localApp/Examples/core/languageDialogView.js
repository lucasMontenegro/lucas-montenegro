import React, { useState, useRef } from "react"
import { Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import makeTranslation from "local/makeTranslation"
import LanguageDialogView from "local/core/LanguageDialogView"
import theme from "local/theme"
const translations = makeTranslation(
  languageCode => ({ pathname: `/examples/core/router/${languageCode}/example/0` })
)
function LanguageDialogViewExample (props) {
  const { languageCode } = props.match.params
  const [isOpen, setOpenState] = useState(false)
  const translationsRef = useRef(null)
  if (translationsRef.current === null && isOpen) {
    translationsRef.current = translations
  }
  const languageDialogState = {
    languageCode,
    translations: translationsRef.current,
    isOpen,
    open () {
      setOpenState(true)
    },
    close () {
      setOpenState(false)
    },
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <LanguageDialogView state={languageDialogState}/>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
export default (
  <Route
    exact path="/examples/core/LanguageDialogView/:languageCode"
    component={LanguageDialogViewExample}
  />
)