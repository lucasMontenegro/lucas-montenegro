import jwt from "express-jwt"
import globals from "lib/utils/globals"
import jwksRsa from "jwks-rsa"
import jwtAuthz from "express-jwt-authz"
const { env } = globals.process
export default jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: env.REACT_APP_PROFILES_AUDIENCE,
  issuer: `https://${env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: [`RS256`],
})