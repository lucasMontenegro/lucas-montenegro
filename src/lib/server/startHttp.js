import express from "express"
import sendFrontEndApp from "lib/server/sendFrontEndApp"
import handleAppListen from "lib/server/handleAppListen"
import globals from "lib/utils/globals"
export default function startHttp (api) {
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