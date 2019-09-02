import React from "react"
import { Switch } from "react-router-dom"
import supportedLanguages from "./supportedLanguages"
import core from "./core"
import clients from "./clients"
export default function Examples () {
  return (
    <Switch>
      {supportedLanguages}
      {core}
      {clients}
    </Switch>
  )
}