import express from "express"
import bodyParser from "body-parser"
import httpService from "../index.js"
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(`/api/profiles`, httpService)
const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`\nlib/profiles/httpService/example: listening on port ${PORT}`)
})