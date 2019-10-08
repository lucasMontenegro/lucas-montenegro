const express = require("express")
const { default: todo } = require("new/local/todo/router")
const api = express.Router()
api.use(`/todo`, todo)
exports.default = api