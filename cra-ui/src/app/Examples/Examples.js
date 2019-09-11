import React from "react"
import { Switch } from "react-router-dom"
import supportedLanguages from "./supportedLanguages"
import core from "./core"
import clients from "./clients"
import throwPropTypeErrors from "local/throwPropTypeErrors/example"
export default function Examples () {
  return (
    <Switch>
      {supportedLanguages}
      {core}
      {clients}
      {throwPropTypeErrors}
    </Switch>
  )
}