import monitor from "pg-monitor"
import { matchers, addIgnoredError, errorLogger } from "../errorFiltering"
jest.mock(`pg-monitor`, () => ({
  __esModule: true,
  default: {},
}))
describe(`../errorFiltering`, () => {
  jestUtils.describeDependencies({
    deps: [`pg-monitor`],
    relativeBasePath: __dirname,
  })
  describe(`addIgnoredError`, () => {
    it(`should add items to the matchers array`, () => {
      const match = () => {}
      addIgnoredError(match)
      expect(matchers).toHaveLength(1)
      expect(matchers).toHaveProperty([0], match)
      matchers.pop()
    })
  })
  describe(`errorLogger (one matcher function returns true)`, () => {
    it(`should not log the error`, () => {
      const values = [false, true, false]
      values.forEach(value => addIgnoredError(() => value))
      errorLogger({}, {})
      values.forEach(() => matchers.pop())
    })
  })
  describe(`errorLogger (every matcher function returns false)`, () => {
    it(`should log the error`, () => {
      const values = [false, false, false]
      values.forEach(value => addIgnoredError(() => value))
      const error = monitor.error = jest.fn()
      errorLogger({}, {})
      delete monitor.error
      expect(error.mock.calls).toEqual([[{}, {}]])
      values.forEach(() => matchers.pop())
    })
  })
})