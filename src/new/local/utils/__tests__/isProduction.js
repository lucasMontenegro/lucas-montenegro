jest.mock(`new/local/utils/globals`, () => ({ default: {} }))
const { default: globals } = require("new/local/utils/globals")
const { default: isProduction } = require("new/local/utils/isProduction")
describe(`new/local/utils/isProduction`, () => {
  test.each([
    [`production`, true],
    [`foo`, false],
  ])(`should handle WebPack's "process.env" (NODE_ENV %s)`, (value, expected) => {
    delete globals.process
    const { NODE_ENV } = process.env
    process.env.NODE_ENV = value
    expect(isProduction()).toBe(expected)
    process.env.NODE_ENV = NODE_ENV
  })
  test.each([
    [`production`, true],
    [`foo`, false],
  ])(`should handle the "globals" module's "process.env" (NODE_ENV %s)`, (value, expected) => {
    globals.process = { env: { NODE_ENV: value } }
    expect(isProduction()).toBe(expected)
  })
})