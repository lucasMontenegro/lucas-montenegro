jest.mock(`global`, () => ({ __esModule: true, default: {} }))
import global from "global"
import isProduction from "new/lib/utils/isProduction"
describe(`new/lib/utils/isProduction`, () => {
  test.each([
    [`production`, true],
    [`foo`, false],
  ])(`should handle WebPack's "process.env" (NODE_ENV %s)`, (value, expected) => {
    delete global.process
    const { NODE_ENV } = process.env
    process.env.NODE_ENV = value
    expect(isProduction()).toBe(expected)
    process.env.NODE_ENV = NODE_ENV
  })
  test.each([
    [`production`, true],
    [`foo`, false],
  ])(`should handle the "global" package's "process.env" (NODE_ENV %s)`, (value, expected) => {
    global.process = { env: { NODE_ENV: value } }
    expect(isProduction()).toBe(expected)
  })
})