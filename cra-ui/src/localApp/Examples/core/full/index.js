import React from "react"
import { Route } from "react-router-dom"
import createApp from "local/core/createApp"
import makeTranslations from "local/makeTranslations"
import routing from "./routing"
import home from "./home"
import example from "./example"
import notFound from "./notFound"
const App = createApp({
  name: `ExampleApp`,
  routing,
  clients: { home, example, notFound },
  logo: <div>logo</div>,
  titles: makeTranslations(() => `Lucas Montenegro`),
})
export default (<Route path="/examples/core/full" component={App} />)