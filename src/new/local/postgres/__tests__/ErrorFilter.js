import monitor from "pg-monitor"
import ErrorFilter from "new/local/postgres/ErrorFilter"
const mockFn = jest.fn()
jest.mock(`pg-monitor`, () => ({ __esModule: true, default: {} }))
monitor.error = (...args) => {
  mockFn(`monitor.error`, args)
}
describe(`new/local/postgres/ErrorFilter`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`pg-monitor`])).toMatchSnapshot()
  })
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