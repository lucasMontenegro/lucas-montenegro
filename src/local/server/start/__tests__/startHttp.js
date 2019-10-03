const mockFn = jest.fn()
jest.mock(`express`, () => jest.fn())
const express = require("express")
express.mockImplementation((...args) => {
  mockFn(`express`, args)
  return [`use`, `get`, `listen`].reduce((app, name) => {
    app[name] = (...args) => mockFn(`app.${name}`, args)
    return app
  }, {})
})
express.static = (...args) => {
  mockFn(`express.static`, args)
  return `express.static`
}
jest.mock(`local/server/start/api`, () => jest.fn())
require("local/server/start/api").mockImplementation((...args) => {
  mockFn(`api`, args)
  return `api`
})
jest.mock(`local/server/start/sendFrontEndApp`, () => `local/server/start/sendFrontEndApp`)
jest.mock(`local/server/start/handleAppListen`, () => jest.fn())
require("local/server/start/handleAppListen").mockImplementation((...args) => {
  mockFn(`handleAppListen`, args)
  return `handleAppListen`
})
const mockGlobals = require("local/utils/mockGlobals")
const globals = { process: { env: { BUILD_PATH: `'process.env.BUILD_PATH'` } } }
const oldGlobals = mockGlobals(globals)
const startHttp = require("local/server/start/startHttp")
mockGlobals(oldGlobals)
describe(`local/server/start/startHttp`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [80],
    [null],
  ])(`should configure and start the http app (PORT %j)`, PORT => {
    globals.process.env.PORT = PORT
    startHttp()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})