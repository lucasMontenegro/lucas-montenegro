import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import App from "new/local/app/ui/App"
import Examples from "new/local/paperbase/Examples"
import isProduction from "new/local/utils/isProduction"
export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={App} />
        {isProduction() || <Route path="/examples" component={Examples} />}
      </Switch>
    </BrowserRouter>
  )
}