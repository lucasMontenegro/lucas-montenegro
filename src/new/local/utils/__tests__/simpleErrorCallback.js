const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  default: { console: {} },
}))
require("new/local/utils/globals").default.console.error = (...args) => {
  mockFn(`console.error`, args)
}
const { default: simpleErrorCallback } = require("new/local/utils/simpleErrorCallback")
describe(`new/local/utils/simpleErrorCallback`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [`error message`],
    [null],
  ])(`should log if there is an error (error %j)`, e => {
    simpleErrorCallback(e)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})