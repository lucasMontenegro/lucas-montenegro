import requiredEnv from "lib/utils/requiredEnv"
import globals from "lib/utils/globals"
import express from "express"
import path from "path"
import isProduction from "lib/utils/isProduction"
export default function httpServer (api) {
  const buildPath = requiredEnv(`BUILD_PATH`)
  const PORT = globals.process.env.PORT || 5000
  const app = express()
  // Priority serve any static files.
  app.use(express.static(buildPath))
  // Answer API requests.
  api && app.use(`/api`, api)
  // All remaining requests return the React app, so it can handle routing.
  app.get(`*`, (req, res) => res.sendFile(path.resolve(buildPath, `index.html`)))
  app.listen(PORT, () => {
    const name = isProduction() ? `cluster worker ${globals.process.pid}` : `dev server`
    globals.console.log(`Node ${name}: listening on port ${PORT}`)
  })
}