import React from "react"
import { Switch } from "react-router-dom"
import browserSetWindowSize from "./browserSetWindowSize"
import throwPropTypeErrors from "local/throwPropTypeErrors/example"
import core from "./core"
import clients from "./clients"
export default function Examples () {
  return (
    <Switch>
      {browserSetWindowSize}
      {throwPropTypeErrors}
      {core}
      {clients}
    </Switch>
  )
}