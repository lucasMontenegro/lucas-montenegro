import express from "express"
import api from "new/local/server/api"
import sendFrontEndApp from "new/local/server/sendFrontEndApp"
import handleAppListen from "new/local/server/handleAppListen"
import globals from "new/local/utils/globals"
export default function startHttp () {
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