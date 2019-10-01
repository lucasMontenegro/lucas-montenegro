const path = require("path")
const express = require("express")
const api = require("local/api")
module.exports = function startHttp () {
  const buildpath = process.env.BUILD_PATH
  const PORT = process.env.PORT || 5000
  const app = express()
  // Priority serve any static files.
  app.use(express.static(buildpath))
  // Answer API requests.
  app.use(`/api`, api)
  {
    // All remaining requests return the React app, so it can handle routing.
    const str = path.resolve(buildpath, `index.html`)
    app.get(`*`, (req, res) => res.sendFile(str))
  }
  app.listen(PORT, () => {
    const name = (
      process.env.NODE_ENV === `production` ? `cluster worker ${process.pid}` : `dev server`
    )
    console.log(`Node ${name}: listening on port ${PORT}`)
  })
}