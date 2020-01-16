import express from "express"
import handleAppListen from "new/local/server/handleAppListen"
import globals from "new/local/utils/globals"
import startHttp from "new/local/server/startHttp"
const mockFn = jest.fn()
const makeFn = name => (...args) => {
  const arr = [name, args]
  mockFn(...arr)
  return arr
}
jest.mock(`express`, () => ({ __esModule: true, default: jest.fn() }))
express.mockImplementation((...args) => {
  mockFn(`express`, args)
  return [`use`, `get`, `listen`].reduce((app, name) => {
    app[name] = makeFn(`app.${name}`)
    return app
  }, {})
})
express.static = makeFn(`express.static`)
jest.mock(`new/local/server/api`, () => ({
  __esModule: true,
  default: `new/local/server/api`,
}))
jest.mock(`new/local/server/sendFrontEndApp`, () => ({
  __esModule: true,
  default: `new/local/server/sendFrontEndApp`,
}))
jest.mock(`new/local/server/handleAppListen`, () => ({
  __esModule: true,
  default: jest.fn(),
}))
handleAppListen.mockImplementation(makeFn(`handleAppListen`))
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { env: { BUILD_PATH: `'process.env.BUILD_PATH'` } },
  },
}))
describe(`new/local/server/startHttp`, () => {
  afterEach(() => mockFn.mockClear())
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`express`])).toMatchSnapshot()
  })
  test.each([
    [80],
    [null],
  ])(`should configure and start the http app (PORT %j)`, PORT => {
    globals.process.env.PORT = PORT
    startHttp()
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})