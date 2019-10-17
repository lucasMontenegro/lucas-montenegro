import React from "react"
import makeTranslations from "new/local/utils/makeTranslations"
import HomeIcon from "@material-ui/icons/Home"
const icon = <HomeIcon />
export default {
  subtitles: makeTranslations({
    en: `Home`,
    es: `Inicio`,
  }),
  icons: makeTranslations(() => icon),
  messages: makeTranslations({
    en: `Welcome to my Personal Website`,
    es: `Bienvenido a mi Página Web Personal`,
  }),
}