import useTranslation from "./index.js"
import React from "react"
import Div from "lib/react/utils/Div"
import Link from "@material-ui/core/Link"
import languageDetector from "lib/languageDetector"
import { Route, Switch } from "react-router-dom"
function Example () {
  const t = useTranslation()
  return (
    <Div color="RoyalBlue">
      {t({
        default: () => `This is the default language`,
        en: () => `This is English`,
        es: () => `This is Spanish`,
      })}
    </Div>
  )
}
function Nav () {
  return (
    <ul>
      <li><Link href="/react/useTranslation/en">English</Link></li>
      <li><Link href="/react/useTranslation/es">Spanish</Link></li>
      <li><Link href="/react/useTranslation/pt">Portuguese (not supported)</Link></li>
    </ul>
  )
}
function Init (props) {
  languageDetector.init([`en`, `es`, `pt`])
  if (languageDetector.useReadyState()) {
    languageDetector.set(props.match.params.languageCode)
    return <Example />
  }
  return null
}
function Routing () {
  return (
    <Switch>
      <Route exact path="/react/useTranslation" component={Nav} />
      <Route exact path="/react/useTranslation/:languageCode" component={Init} />
    </Switch>
  )
}
export default (<Route path="/react/useTranslation" component={Routing} />)