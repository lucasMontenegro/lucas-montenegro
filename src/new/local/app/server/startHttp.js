const express = require("express")
const { default: api } = require("new/local/app/server/api")
const { default: sendFrontEndApp } = require("new/local/app/server/sendFrontEndApp")
const { default: handleAppListen } = require("new/local/app/server/handleAppListen")
const { default: globals } = require("new/local/utils/globals")
exports.default = function startHttp () {
  const app = express()
  // Priority serve any static files.
  app.use(express.static(globals.process.env.BUILD_PATH))
  // Answer API requests.
  app.use(`/api`, api)
  // All remaining requests return the React app, so it can handle routing.
  app.get(`*`, sendFrontEndApp)
  const PORT = globals.process.env.PORT || 5000
  app.listen(PORT, handleAppListen(PORT))
}