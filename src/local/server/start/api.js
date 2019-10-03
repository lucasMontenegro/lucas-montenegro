const express = require("express")
const todo = require("local/todo/router")
module.exports = function api () {
  const router = express.Router()
  router.use(`/todo`, todo())
  return router
}