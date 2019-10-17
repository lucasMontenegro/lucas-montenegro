import React from "react"
import { Switch } from "react-router-dom"
import throwPropTypeErrors from "new/local/ui/__examples__/throwPropTypeErrors"
export default function OldExamples () {
  return (
    <Switch>
      {throwPropTypeErrors}
    </Switch>
  )
}