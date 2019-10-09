import pgPromise from "pg-promise"
import monitor from "pg-monitor"
import HandleMonitorLog from "new/local/postgres/HandleMonitorLog"
import ErrorFilter from "new/local/postgres/ErrorFilter"
import isProduction from "new/local/utils/isProduction"
import startDb from "new/local/postgres/startDb"
const mockFn = jest.fn()
jest.mock(`pg-promise`, () => ({ __esModule: true, default: jest.fn() }))
pgPromise.mockImplementation((...args) => {
  mockFn(`pgPromise`, args)
  return pgp
})
const pgp = (...args) => {
  mockFn(`pgp`, args)
  return db
}
const db = {}
jest.mock(`pg-monitor`, () => ({ __esModule: true, default: {} }))
;[`setTheme`, `setLog`, `attach`].reduce((monitor, name) => {
  monitor[name] = (...args) => mockFn(`monitor.${name}`, args)
  return monitor
}, monitor)
jest.mock(`bluebird`, () => ({ __esModule: true, default: `Bluebird` }))
jest.mock(`new/local/postgres/HandleMonitorLog`, () => ({ __esModule: true, default: jest.fn() }))
HandleMonitorLog.mockImplementation((...args) => {
  mockFn(`HandleMonitorLog`, args)
  return `HandleMonitorLog()`
})
jest.mock(`new/local/postgres/ErrorFilter`, () => ({ __esModule: true, default: jest.fn() }))
ErrorFilter.mockImplementation((...args) => {
  mockFn(`ErrorFilter`, args)
  return {
    ignore: `errorFilter.ignore`,
    logger: `errorFilter.logger`,
  }
})
jest.mock(`new/local/postgres/extendRepos`, () => ({
  __esModule: true,
  default: `new/local/postgres/extendRepos`,
}))
jest.mock(`new/local/utils/globals`, () => ({
  __esModule: true,
  default: {
    process: {
      env: {
        PG_HOST: `'process.env.PG_HOST'`,
        PG_DATABASE: `'process.env.PG_DATABASE'`,
        PG_USER: `'process.env.PG_USER'`,
        PG_PASSWORD: `'process.env.PG_PASSWORD'`,
      },
    },
  },
}))
jest.mock(`new/local/utils/isProduction`, () => ({ __esModule: true, default: jest.fn() }))
describe(`new/local/postgres/startDb`, () => {
  test.each([
    [true],
    [false],
  ])(`should configure pg-promise (isProduction %j)`, isProductionValue => {
    isProduction.mockReturnValueOnce(isProductionValue)
    const result = startDb()
    expect(Object.values(result)).toHaveLength(3)
    expect(result).toHaveProperty(`db`, db)
    expect(result).toHaveProperty(`pgp`, pgp)
    expect(result).toHaveProperty(`ignoreError`, `errorFilter.ignore`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})