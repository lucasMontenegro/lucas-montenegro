import React from "react"
import { Switch } from "react-router-dom"
import supportedLanguages from "./supportedLanguages"
import throwPropTypeErrors from "local/throwPropTypeErrors/example"
import core from "./core"
import clients from "./clients"
export default function Examples () {
  return (
    <Switch>
      {supportedLanguages}
      {throwPropTypeErrors}
      {core}
      {clients}
    </Switch>
  )
}