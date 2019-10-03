const mockFn = jest.fn()
jest.mock(`express`, () => ({}))
require("express").Router = (...args) => {
  mockFn(`express.Router`, args)
  return router
}
const router = { use: (...args) => mockFn(`router.use`, args) }
jest.mock(`local/todo/router`, () => jest.fn())
require("local/todo/router").mockImplementation((...args) => {
  mockFn(`todo`, args)
  return `todo`
})
const api = require("local/server/start/api")
describe(`local/server/start/api`, () => {
  it(`should configure and return the API router`, () => {
    expect(api()).toBe(router)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})