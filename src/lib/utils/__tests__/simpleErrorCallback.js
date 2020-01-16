import globals from "lib/utils/globals"
import simpleErrorCallback from "lib/utils/simpleErrorCallback"
const mockFn = jest.fn()
jest.mock(`lib/utils/globals`, () => ({
  __esModule: true,
  default: { console: {} },
}))
globals.console.error = (...args) => {
  mockFn(`console.error`, args)
}
describe(`lib/utils/simpleErrorCallback`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [`error message`],
    [null],
  ])(`should log if there is an error (error %j)`, e => {
    simpleErrorCallback(e)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})