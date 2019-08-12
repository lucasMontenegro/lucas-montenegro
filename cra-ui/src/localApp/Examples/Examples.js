import React from "react"
import { Switch } from "react-router-dom"
import core from "./core"
import supportedLanguages from "./supportedLanguages"
export default function Examples () {
  return (
    <Switch>
      {supportedLanguages}
      {core}
    </Switch>
  )
}