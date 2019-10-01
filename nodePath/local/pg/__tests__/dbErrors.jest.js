jest.mock(`pg-monitor`, () => ({ error: jest.fn() }))
describe(`local/pg/dbErrors`, () => {
  let dbErrors, monitor
  beforeEach(() => {
    dbErrors = require("local/pg/dbErrors")
    monitor = require("pg-monitor")
  })
  afterEach(() => {
    jest.resetModules()
  })
  describe(`dbErrors.ignore`, () => {
    it(`should run`, () => {
      dbErrors.ignore(() => {})
    })
  })
  describe(`dbErrors.logger`, () => {
    test.each([
      [[false, true, false], []],
      [[false, false, false], [[`err`, `e`]]],
    ])(`matchers return values %j => monitor calls %j`, (matcherValues, monitorCalls) => {
      matcherValues.forEach(value => dbErrors.ignore(() => value))
      dbErrors.logger(`err`, `e`)
      expect(monitor.error.mock.calls).toEqual(monitorCalls)
      monitor.error.mockClear()
    })
  })
})