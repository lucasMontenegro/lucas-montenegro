import React from "react"
import { Switch } from "react-router-dom"
import supportedLanguages from "./supportedLanguages"
import core from "./core"
import throwPropTypeErrors from "local/throwPropTypeErrors/example"
import notFoundView from "local/clients/createNotFound/NotFoundView/example"
export default function Examples () {
  return (
    <Switch>
      {supportedLanguages}
      {throwPropTypeErrors}
      {core}
      {/* clients */}
      {notFoundView}
    </Switch>
  )
}