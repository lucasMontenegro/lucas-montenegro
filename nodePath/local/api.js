const express = require("express")
const todo = require("local/todo/router")
const api = express.Router()
api.use(`/todo`, todo)
module.exports = api