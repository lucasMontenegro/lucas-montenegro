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
jest.mock(`new/local/app/server/api`, () => ({ default: `new/local/app/server/api` }))
jest.mock(`new/local/app/server/sendFrontEndApp`, () => ({
  default: `new/local/app/server/sendFrontEndApp`,
}))
jest.mock(`new/local/app/server/handleAppListen`, () => ({}))
require("new/local/app/server/handleAppListen").default = makeFn(`handleAppListen`)
jest.mock(`new/local/utils/globals`, () => ({
  default: {
    process: { env: { BUILD_PATH: `'process.env.BUILD_PATH'` } },
  },
}))
const { default: globals } = require("new/local/utils/globals")
const { default: startHttp } = require("new/local/app/server/startHttp")
describe(`new/local/app/server/startHttp`, () => {
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