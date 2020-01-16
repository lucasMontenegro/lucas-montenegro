import React from "react"
import createApp from "local/core/createApp"
import makeTranslations from "local/makeTranslations"
import routing from "./routing"
import home from "./home"
import notFound from "./notFound"
import { ReactComponent as Logo } from "./logo.svg"
export default createApp({
  name: `main`,
  routing,
  clients: { home, notFound },
  logo: <Logo width="32" height="32" aria-label="Lucas Montenegro logo" />,
  titles: makeTranslations(() => `Lucas Montenegro`),
})