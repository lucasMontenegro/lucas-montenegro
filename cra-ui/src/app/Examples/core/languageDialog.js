import React, { useState, useRef } from "react"
import { Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import makeTranslations from "local/makeTranslations"
import LanguageDialog from "local/core/LanguageDialog"
import theme from "local/theme"
const translations = makeTranslations(
  languageCode => ({ pathname: `/examples/core/LanguageDialog/${languageCode}` })
)
function LanguageDialogExample (props) {
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
          <LanguageDialog state={languageDialogState}/>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
export default (
  <Route
    exact path="/examples/core/LanguageDialog/:languageCode"
    component={LanguageDialogExample}
  />
)