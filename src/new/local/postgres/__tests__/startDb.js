const mockFn = jest.fn()

jest.mock(`pg-promise`, () => jest.fn())
require("pg-promise").mockImplementation((...args) => {
  mockFn(`pgPromise`, args)
  return pgp
})
const pgp = (...args) => {
  mockFn(`pgp`, args)
  return db
}
const db = {}

jest.mock(`pg-monitor`, () => ({}))
;[`setTheme`, `setLog`, `attach`].reduce((monitor, name) => {
  monitor[name] = (...args) => mockFn(`monitor.${name}`, args)
  return monitor
}, require("pg-monitor"))

jest.mock(`bluebird`, () => `Bluebird`)

jest.mock(`new/local/postgres/HandleMonitorLog`, () => ({}))
require("new/local/postgres/HandleMonitorLog").default = (...args) => {
  mockFn(`HandleMonitorLog`, args)
  return `HandleMonitorLog()`
}

jest.mock(`new/local/postgres/ErrorFilter`, () => ({}))
require("new/local/postgres/ErrorFilter").default = (...args) => {
  mockFn(`ErrorFilter`, args)
  return {
    ignore: `errorFilter.ignore`,
    logger: `errorFilter.logger`,
  }
}

jest.mock(`new/local/postgres/extendRepos`, () => ({ default: `new/local/postgres/extendRepos` }))

jest.mock(`new/local/utils/globals`, () => ({
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
jest.mock(`new/local/utils/isProduction`, () => ({ default: jest.fn() }))
const { default: isProduction } = require("new/local/utils/isProduction")

const { default: startDb } = require("new/local/postgres/startDb")
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