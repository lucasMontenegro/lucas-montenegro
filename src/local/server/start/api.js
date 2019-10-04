const express = require("express")
const todo = require("local/todo/router")
const api = module.exports = express.Router()
api.use(`/todo`, todo)