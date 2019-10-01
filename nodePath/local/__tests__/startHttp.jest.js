jest.mock(`express`, () => jest.fn())
const express = require("express")
const routes = []
const app = {
  use (...args) {
    routes.push({ type: `use`, args })
    return `app.use()`
  },
  get (...args) {
    routes.push({ type: `get`, args })
    return `app.get()`
  },
  listen: jest.fn(),
}
express.mockReturnValue(app)
express.static = jest.fn(() => `express.static()`)

jest.mock(`local/api`, () => `local/api`)
const mockEnv = require("local/helpers/mockEnv")
const startHttp = require("local/startHttp")
describe(`local/startHttp`, () => {
  it(`should run on default port (5000)`, () => {
    mockEnv(`BUILD_PATH`, `/buildPath`, () => startHttp())
  })
  it(`should run on custom port (80)`, () => {
    mockEnv(`PORT`, 80, () => {
      mockEnv(`BUILD_PATH`, `/buildPath`, () => startHttp())
    })
  })
  it(`should set up the routes`, () => {
    expect(routes).toHaveLength(6)
  })
  it(`should serve static files`, () => {
    ;[0, 3].forEach(n => {
      expect(routes).toHaveProperty([n, `type`], `use`)
      expect(routes[n].args).toHaveLength(1)
      expect(routes).toHaveProperty([n, `args`, 0], `express.static()`)
    })
    expect(express.static.mock.calls).toEqual([[`/buildPath`], [`/buildPath`]])
  })
  it(`should set up the /api route`, () => {
    ;[1, 4].forEach(n => {
      expect(routes).toHaveProperty([n, `type`], `use`)
      expect(routes[n].args).toHaveLength(2)
      expect(routes).toHaveProperty([n, `args`, 0], `/api`)
      expect(routes).toHaveProperty([n, `args`, 1], `local/api`)
    })
  })
  it(`should send the remaining requests to the front-end app`, () => {
    ;[2, 5].forEach(n => {
      expect(routes).toHaveProperty([n, `type`], `get`)
      expect(routes[n].args).toHaveLength(2)
      expect(routes).toHaveProperty([n, `args`, 0], `*`)
      const handler = routes[n].args[1]
      expect(handler).toBeInstanceOf(Function)
      const sendFile = jest.fn()
      handler(`req`, { sendFile })
      expect(sendFile.mock.calls).toEqual([[`/buildPath/index.html`]])
    })
  })
  test.each([
    [5000, 0],
    [`80`, 1], // process.env converts everything to strings
  ])(`should listen on port %d, calls[%d]`, (port, i) => {
    expect(app.listen.mock.calls[i]).toHaveLength(2)
    expect(app.listen.mock.calls[i][0]).toBe(port)
    const cb = app.listen.mock.calls[i][1]
    expect(cb).toBeInstanceOf(Function)
    const consoleLog = console.log
    const spy = console.log = jest.fn()
    cb()
    console.log = consoleLog
    expect(spy.mock.calls).toHaveLength(1)
    expect(spy.mock.calls[0]).toHaveLength(1)
  })
})