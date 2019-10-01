jest.mock(`express`, () => ({ Router: jest.fn() }))
const express = require("express")
const todo = {
  use: jest.fn(() => `todo.use()`),
  rest: jest.fn(() => `todo.rest()`),
}
express.Router.mockReturnValue(todo)

jest.mock(`express-jwt`, () => jest.fn(() => `jwt()`))
const jwt = require("express-jwt")

jest.mock(`jwks-rsa`, () => ({ expressJwtSecret: jest.fn(() => `jwksRsa.expressJwtSecret()`) }))
const jwksRsa = require("jwks-rsa")

jest.mock(`express-jwt-authz`, () => jest.fn(() => `jwtAuthz()`))
const jwtAuthz = require("express-jwt-authz")

jest.mock(`body-parser`, () => ({
  json: jest.fn(() => `bodyParser.json()`),
  urlencoded: jest.fn(() => `bodyParser.urlencoded()`),
}))
const bodyParser = require("body-parser")

jest.mock(`local/helpers/syncRouteHandler`, () => jest.fn(() => `syncRouteHandler()`))
const syncRouteHandler = require("local/helpers/syncRouteHandler")

jest.mock(`local/todo/controllers`, () => [
  {
    rest: `rest`,
    crud: `crud`,
    pathname: `/pathname`,
    validator: `validator`,
    handler: `handler`,
  },
  {
    rest: `rest`,
    crud: `crud`,
    pathname: `/pathname`,
    validator: null,
    handler: `handler`,
  },
])
const controllers = require("local/todo/controllers")

process.env.AUTH0_DOMAIN = `https://example.auth0.com`
process.env.LUCAS_MONTENEGRO_DOMAIN = `https://example.com`
const router = require("local/todo/router")
delete process.env.AUTH0_DOMAIN
delete process.env.LUCAS_MONTENEGRO_DOMAIN

describe(`local/todo/router`, () => {
  it(`should create a new ExpressJS router and export it`, () => {
    expect(express.Router.mock.calls).toEqual([[]])
    expect(router).toBe(todo)
  })
  it(`should set up the body-parser middleware`, () => {
    expect(bodyParser.json.mock.calls).toEqual([[]])
    expect(bodyParser.urlencoded.mock.calls).toEqual([[{ extended: true }]])
    expect(todo.use.mock.calls).toEqual([[`bodyParser.json()`], [`bodyParser.urlencoded()`]])
  })
  it(`should create the JWT secret provider`, () => {
    expect(jwksRsa.expressJwtSecret.mock.calls).toEqual([[{
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://example.auth0.com/.well-known/jwks.json`,
    }]])
  })
  it(`should set up the JWT validator`, () => {
    expect(jwt.mock.calls).toEqual([[{
      secret: `jwksRsa.expressJwtSecret()`,
      audience: `https://example.com/api/todo`,
      issuer: `https://example.com`,
      algorithms: [`RS256`],
    }]])
  })
  it(`should check the client permissions`, () => {
    expect(jwtAuthz.mock.calls).toEqual([[[`crud:todo`]], [[`crud:todo`]]])
  })
  it(`should create async route handlers`, () => {
    expect(syncRouteHandler.mock.calls).toEqual([[`handler`], [`handler`]])
  })
  it(`should add the handlers with and without validation`, () => {
    expect(todo.rest.mock.calls).toEqual([
      [`/pathname`, [`jwt()`, `jwtAuthz()`, `validator`, `syncRouteHandler()`]],
      [`/pathname`, [`jwt()`, `jwtAuthz()`, `syncRouteHandler()`]],
    ])
  })
})