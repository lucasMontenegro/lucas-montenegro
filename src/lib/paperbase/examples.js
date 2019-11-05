import React from "react"
import { Switch, Route } from "react-router-dom"
import LanguageDialog from "lib/paperbase/LanguageDialog/example"
export default (
  <Route
    path="/paperbase"
    render={() => (
      <Switch>
        {LanguageDialog}
      </Switch>
    )}
  />
)