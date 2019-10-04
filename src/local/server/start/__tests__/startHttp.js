const mockFn = jest.fn()
const makeFn = name => (...args) => {
  const arr = [name, args]
  mockFn(...arr)
  return arr
}
jest.mock(`express`, () => jest.fn())
const express = require("express")
express.mockImplementation((...args) => {
  mockFn(`express`, args)
  return [`use`, `get`, `listen`].reduce((app, name) => {
    app[name] = makeFn(`app.${name}`)
    return app
  }, {})
})
express.static = makeFn(`express.static`)
jest.mock(`local/server/start/api`, () => `local/server/start/api`)
jest.mock(`local/server/start/sendFrontEndApp`, () => `local/server/start/sendFrontEndApp`)
jest.mock(`local/server/start/handleAppListen`, () => jest.fn())
require("local/server/start/handleAppListen").mockImplementation(makeFn(`handleAppListen`))
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