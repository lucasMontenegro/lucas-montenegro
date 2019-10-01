const express = require("express")
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const jwtAuthz = require("express-jwt-authz")
const bodyParser = require("body-parser")
const syncRouteHandler = require("local/helpers/syncRouteHandler")
const controllers = require("local/todo/controllers")
const todo = module.exports = express.Router()
todo.use(bodyParser.json())
todo.use(bodyParser.urlencoded({ extended: true }))
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: `${process.env.LUCAS_MONTENEGRO_DOMAIN}/api/todo`,
  issuer: process.env.LUCAS_MONTENEGRO_DOMAIN,
  algorithms: [`RS256`],
})
controllers.forEach(controller => {
  const handlers = [checkJwt, jwtAuthz([`${controller.crud}:todo`])]
  controller.validator && handlers.push(controller.validator)
  handlers.push(syncRouteHandler(controller.handler))
  todo[controller.rest](controller.pathname, handlers)
})