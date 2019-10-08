const React = require("react")
const { BrowserRouter, Switch, Route } = require("react-router-dom")
const { default: App } = require("new/local/app/ui/App")
exports.default = (
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
)