import globals from "new/local/utils/globals"
import simpleErrorCallback from "new/local/utils/simpleErrorCallback"
const mockFn = jest.fn()
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
globals.console.error = (...args) => {
  mockFn(`console.error`, args)
}
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