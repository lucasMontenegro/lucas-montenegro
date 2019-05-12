import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import store from "./store"
import { StylingProvider } from "./styling"
import Examples from "./Examples"
import App from "./App"

const mainRoute = <Route component={App} />

const app = (
  <Provider store={store}>
    <StylingProvider>
      <BrowserRouter>
        {process.env.NOVE_ENV === `production`
          ? mainRoute
          : (
              <Switch>
                <Route path="/examples" component={Examples} />
                {mainRoute}
              </Switch>
            )
        }
      </BrowserRouter>
    </StylingProvider>
  </Provider>
)

ReactDOM.render(app, document.getElementById(`root`))
