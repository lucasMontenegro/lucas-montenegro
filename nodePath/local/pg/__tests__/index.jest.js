jest.mock(`pg-promise`, () => jest.fn())
const pgp = jest.fn()
const db = { $config: { pgp: { end: jest.fn() } } }
const pgPromise = require(`pg-promise`)
pgPromise.mockReturnValue(pgp)
pgp.mockReturnValue(db)

jest.mock(`pg-monitor`, () => ({
  setTheme: jest.fn(),
  setLog: jest.fn(),
  attach: jest.fn(),
}))
const monitor = require("pg-monitor")

jest.mock(`bluebird`, () => `Bluebird`)

jest.mock(`local/pg/saveLog`, () => jest.fn(() => `saveLog`))
const saveLog = require(`local/pg/saveLog`)

jest.mock(`local/pg/dbErrors`, () => ({ ignore: `dbErrors.ignore`, logger: `dbErrors.logger` }))

jest.mock(`local/pg/extendRepos`, () => jest.fn())
const extendRepos = require(`local/pg/extendRepos`)

jest.mock(`local/pg/events`, () => jest.fn(() => `events`))
const events = require(`local/pg/events`)

describe(`local/pg`, () => {
  let pg
  beforeAll(() => {
    process.env.PG_HOST = `PG_HOST`
    process.env.PG_DATABASE = `PG_DATABASE`
    process.env.PG_USER = `PG_USER`
    process.env.PG_PASSWORD = `PG_PASSWORD`
    pg = require("local/pg")
    delete process.env.PG_HOST
    delete process.env.PG_DATABASE
    delete process.env.PG_USER
    delete process.env.PG_PASSWORD
  })
  it(`should re-export dbErrors.ignore`, () => {
    expect(pg.ignoreDbError).toBe(`dbErrors.ignore`)
  })
  it(`should configure pg-promise`, () => {
    expect(pgPromise.mock.calls).toHaveLength(1)
    expect(pgPromise.mock.calls[0]).toHaveLength(1)
    const initOptions = pgPromise.mock.calls[0][0]
    expect(Object.keys(initOptions)).toHaveLength(3)
    expect(initOptions.promiseLib).toBe(`Bluebird`)
    expect(initOptions.error).toBe(`dbErrors.logger`)
    expect(initOptions.extend).toBeInstanceOf(Function)
    expect(pg.pgp).toBe(pgp)
  })
  it(`should create the database object`, () => {
    expect(pgp.mock.calls).toEqual([[{
      host: `PG_HOST`,
      database: `PG_DATABASE`,
      user: `PG_USER`,
      password: `PG_PASSWORD`,
    }]])
    expect(pg.db).toBe(db)
  })
  it(`should extend the repos`, () => {
    pgPromise.mock.calls[0][0].extend(`db`, `dc`)
    expect(extendRepos.mock.calls).toEqual([[pgp, `db`, `dc`]])
  })
  it(`should gracefully shutdown the connection`, () => {
    pg.closeDb()
    expect(db.$config.pgp.end.mock.calls).toEqual([[]])
  })
  it(`should configure pg-monitor`, () => {
    expect(monitor.setTheme.mock.calls).toEqual([[`matrix`]])
    expect(saveLog.mock.calls).toEqual([[]])
    expect(monitor.setLog.mock.calls).toEqual([[`saveLog`]])
    const initOptions = pgPromise.mock.calls[0][0]
    expect(monitor.attach.mock.calls).toEqual([[initOptions, `events`]])
  })
})