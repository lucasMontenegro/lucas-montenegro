import globals from "lib/utils/globals"
import express from "express"
import isProduction from "lib/utils/isProduction"
jest.mock(`lib/utils/globals`, () => ({ __esModule: true, default: {} }))
jest.mock(`express`, () => ({ __esModule: true, default: jest.fn() }))
express.static = str => `express.static('${str}')`
jest.mock(`lib/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`./index.js`, () => {
  let httpServer
  beforeAll(() => {
    httpServer = require("./index.js").default
  })
  it(`should use the right versions of its dependencies`, () => {
    expect(jestUtils.getDependencies([`express`])).toMatchSnapshot()
  })
  const cases = [
    [
      1234,
      { name: `api` },
      `Node cluster worker 'globals.process.pid': listening on port 1234`,
      `Node dev server: listening on port 1234`,
    ],
    [
      undefined,
      { name: `api` },
      `Node cluster worker 'globals.process.pid': listening on port 5000`,
      `Node dev server: listening on port 5000`,
    ],
    [
      1234,
      undefined,
      `Node cluster worker 'globals.process.pid': listening on port 1234`,
      `Node dev server: listening on port 1234`,
    ],
    [
      undefined,
      undefined,
      `Node cluster worker 'globals.process.pid': listening on port 5000`,
      `Node dev server: listening on port 5000`,
    ],
  ]
  describe.each(cases)(`httpServer (port %j, api %j)`, (port, api, prodMsg, devMsg) => {
    const appFn = jest.fn()
    const app = {
      use: jest.fn((...args) => appFn(`app.use`, args)),
      get: jest.fn((...args) => appFn(`app.get`, args)),
      listen: jest.fn((...args) => appFn(`app.listen`, args)),
    }
    beforeAll(() => {
      globals.process = { env: { BUILD_PATH: `/build-path`, PORT: port } }
      express.mockReturnValueOnce(app)
      httpServer(api)
    })
    it(`should set up an ExpressJS app`, () => {
      expect(appFn.mock.calls).toMatchSnapshot()
      appFn.mockClear()
    })
    describe(`get * request handler`, () => {
      it(`should send index.html`, () => {
        const handler = app.get.mock.calls[0][1]
        const res = { sendFile: str => `res.sendFile('${str}')` }
        expect(handler({}, res)).toBe(`res.sendFile('/build-path/index.html')`)
      })
    })
    describe(`http listen handler (isProduction => true)`, () => {
      it(`should log a message`, () => {
        const handler = app.listen.mock.calls[0][1]
        globals.process = { pid: `'globals.process.pid'` }
        const log = jest.fn()
        globals.console = { log }
        isProduction.mockReturnValueOnce(true)
        handler()
        expect(log.mock.calls[0][0]).toBe(prodMsg)
      })
    })
    describe(`http listen handler (isProduction => false)`, () => {
      it(`should log a message`, () => {
        const handler = app.listen.mock.calls[0][1]
        const log = jest.fn()
        globals.console = { log }
        isProduction.mockReturnValueOnce(false)
        handler()
        expect(log.mock.calls[0][0]).toBe(devMsg)
      })
    })
  })
})