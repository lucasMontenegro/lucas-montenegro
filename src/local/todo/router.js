const express = require("express")
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const jwtAuthz = require("express-jwt-authz")
const bodyParser = require("body-parser")
const requestHandlers = require("local/todo/requestHandlers")
const validators = require("local/todo/validators")
const { process } = global
const todo = module.exports = express.Router()
todo.use(bodyParser.json())
todo.use(bodyParser.urlencoded({ extended: true }))
todo.route(`/todo`)
  .all(jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: `${process.env.LUCAS_MONTENEGRO_DOMAIN}/api/todo`,
    issuer: process.env.LUCAS_MONTENEGRO_DOMAIN,
    algorithms: [`RS256`],
  }))
  .post(jwtAuthz([`create:todo`]), validators.post, requestHandlers.post)
  .get(jwtAuthz([`read:todo`]), requestHandlers.get)
  .put(jwtAuthz([`update:todo`]), validators.put, requestHandlers.put)
  .delete(jwtAuthz([`delete:todo`]), validators.delete, requestHandlers.delete)