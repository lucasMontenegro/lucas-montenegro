import startDb from "new/local/postgres/startDb"
import * as postgres from "new/local/postgres"
jest.mock(`new/local/postgres/startDb`, () => {
  const values = {
    db: {
      $config: { pgp: { end: jest.fn() } }
    },
    pgp: {},
    ignoreError: {},
  }
  return { __esModule: true, default: jest.fn(() => values) }
})
const startDbValues = startDb()
describe(`new/local/postgres`, () => {
  it(`should re-export`, () => {
    expect(startDb.mock.calls).toMatchSnapshot()
    expect(postgres).toHaveProperty(`db`, startDbValues.db)
    expect(postgres).toHaveProperty(`pgp`, startDbValues.pgp)
    expect(postgres).toHaveProperty(`ignoreError`, startDbValues.ignoreError)
  })
  it(`should close the database`, () => {
    postgres.closeDb()
    expect(startDbValues.db.$config.pgp.end.mock.calls).toEqual([[]])
  })
})