import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import isProduction from "new/local/utils/isProduction"
import App from "new/local/ui/App"
import Examples from "new/local/ui/Routes/Examples"
import OldExamples from "new/local/ui/Routes/OldExamples"
export default function Routes () {
  return (
    <BrowserRouter>
      {
        isProduction() ? <Route component={App} /> :
        (
          <Switch>
            <Route path="/examples" component={Examples} />
            <Route path="/old-examples" component={OldExamples} />
            <Route component={App} />
          </Switch>
        )
      }
    </BrowserRouter>
  )
}