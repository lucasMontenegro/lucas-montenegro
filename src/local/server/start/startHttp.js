const express = require("express")
const api = require("local/server/start/api")
const sendFrontEndApp = require("local/server/start/sendFrontEndApp")
const handleAppListen = require("local/server/start/handleAppListen")
const { process } = global
module.exports = function startHttp () {
  const app = express()
  // Priority serve any static files.
  app.use(express.static(process.env.BUILD_PATH))
  // Answer API requests.
  app.use(`/api`, api())
  // All remaining requests return the React app, so it can handle routing.
  app.get(`*`, sendFrontEndApp)
  const PORT = process.env.PORT || 5000
  app.listen(PORT, handleAppListen(PORT))
}