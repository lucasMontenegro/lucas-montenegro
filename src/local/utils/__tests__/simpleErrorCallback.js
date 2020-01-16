const mockFn = jest.fn()
const mockGlobals = require("local/utils/mockGlobals")
const globals = { console: { error: (...args) => mockFn(`console.error`, args) } }
const oldGlobals = mockGlobals(globals)
const simpleErrorCallback = require("local/utils/simpleErrorCallback")
mockGlobals(oldGlobals)
describe(`local/utils/simpleErrorCallback`, () => {
  test.each([
    [`error message`],
    [null],
  ])(`should log if there is an error (error %j)`, e => {
    simpleErrorCallback(e)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})