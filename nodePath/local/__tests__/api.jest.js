jest.mock(`express`, () => ({ Router: jest.fn() }))
const express = require("express")
const apiSpy = { use: jest.fn() }
express.Router.mockReturnValue(apiSpy)
jest.mock(`local/todo/router`, () => `todo`)
const api = require("local/api")
describe(`local/api`, () => {
  it(`should create a new router object`, () => {
    expect(api).toBe(apiSpy)
  })
  it(`should add the routes`, () => {
    expect(apiSpy.use.mock.calls).toEqual([[`/todo`, `todo`]])
  })
})