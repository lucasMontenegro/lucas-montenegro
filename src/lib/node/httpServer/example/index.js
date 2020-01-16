import express from "express"
import path from "path"
import httpServer from "../index.js"
console.log(`\n`)
const api = express.Router()
api.get(`/`, function (req, res) {
  res.set(`Content-Type`, `application/json`)
  res.send(`{"message":"Hello from the custom server!"}`)
})
process.env.BUILD_PATH = path.resolve(__dirname, `public`)
process.env.PORT = `1234`
httpServer(api)