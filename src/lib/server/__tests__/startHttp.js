import express from "express"
import handleAppListen from "lib/server/handleAppListen"
import globals from "lib/utils/globals"
import startHttp from "lib/server/startHttp"
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
jest.mock(`lib/server/sendFrontEndApp`, () => ({
  __esModule: true,
  default: `lib/server/sendFrontEndApp`,
}))
jest.mock(`lib/server/handleAppListen`, () => ({
  __esModule: true,
  default: jest.fn(),
}))
handleAppListen.mockImplementation(makeFn(`handleAppListen`))
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: { env: { BUILD_PATH: `'process.env.BUILD_PATH'` } },
  },
}))
describe(`lib/server/startHttp`, () => {
  afterEach(() => mockFn.mockClear())
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`express`])).toMatchSnapshot()
  })
  test.each([
    [80],
    [null],
  ])(`should configure and start the http app (PORT %j)`, PORT => {
    globals.process.env.PORT = PORT
    startHttp(`api`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})