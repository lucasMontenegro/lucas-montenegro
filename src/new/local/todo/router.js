import express from "express"
import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
import jwtAuthz from "express-jwt-authz"
import bodyParser from "body-parser"
import requestHandlers from "new/local/todo/requestHandlers"
import validators from "new/local/todo/validators"
import globals from "new/local/utils/globals"
const todo = express.Router()
todo.use(bodyParser.json())
todo.use(bodyParser.urlencoded({ extended: true }))
todo.route(`/todo`)
  .all(jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${globals.process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: `${globals.process.env.LUCAS_MONTENEGRO_DOMAIN}/api/todo`,
    issuer: globals.process.env.LUCAS_MONTENEGRO_DOMAIN,
    algorithms: [`RS256`],
  }))
  .post(jwtAuthz([`create:todo`]), validators.post, requestHandlers.post)
  .get(jwtAuthz([`read:todo`]), requestHandlers.get)
  .put(jwtAuthz([`update:todo`]), validators.put, requestHandlers.put)
  .delete(jwtAuthz([`delete:todo`]), validators.delete, requestHandlers.delete)
export default todo