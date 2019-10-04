const mockFn = jest.fn()
jest.mock(`pg-monitor`, () => ({}))
require("pg-monitor").error = (...args) => {
  mockFn(`monitor.error`, args)
}
const ErrorFilter = require("local/server/pg/ErrorFilter")
describe(`local/server/pg/ErrorFilter`, () => {
  afterEach(() => mockFn.mockClear())
  test.each([
    [`not log`, [false, true, false]],
    [`log error`, [false, false, false]],
  ])(`should %s (matchers %j)`, (str, matcherValues) => {
    const errorFilter = ErrorFilter()
    matcherValues.forEach((value, i) => errorFilter.ignore((...args) => {
      mockFn(`errorMatcher${i}`, args)
      return value
    }))
    errorFilter.logger(`err`, `e`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})