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

jest.mock(`local/server/pg/HandleMonitorLog`, () => jest.fn())
require("local/server/pg/HandleMonitorLog").mockImplementation((...args) => {
  mockFn(`HandleMonitorLog`, args)
  return `HandleMonitorLog()`
})

jest.mock(`local/server/pg/ErrorFilter`, () => jest.fn())
require("local/server/pg/ErrorFilter").mockImplementation((...args) => {
  mockFn(`ErrorFilter`, args)
  return {
    ignore: `errorFilter.ignore`,
    logger: `errorFilter.logger`,
  }
})

jest.mock(`local/server/pg/extendRepos`, () => `local/server/pg/extendRepos`)

const mockGlobals = require("local/utils/mockGlobals")
const globals = {
  process: {
    env: {
      PG_HOST: `'process.env.PG_HOST'`,
      PG_DATABASE: `'process.env.PG_DATABASE'`,
      PG_USER: `'process.env.PG_USER'`,
      PG_PASSWORD: `'process.env.PG_PASSWORD'`,
    },
  },
}
const oldGlobals = mockGlobals(globals)
const startDb = require("local/server/pg/startDb")
mockGlobals(oldGlobals)

describe(`local/server/pg/startDb`, () => {
  test.each([
    [`production`],
    [`foo`],
  ])(`should configure pg-promise (NODE_ENV %s)`, NODE_ENV => {
    const result = startDb()
    expect(Object.values(result)).toHaveLength(3)
    expect(result).toHaveProperty(`db`, db)
    expect(result).toHaveProperty(`pgp`, pgp)
    expect(result).toHaveProperty(`ignoreError`, `errorFilter.ignore`)
    expect(mockFn.mock.calls).toMatchSnapshot()
  })
})