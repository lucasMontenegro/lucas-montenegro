jest.mock(`local/server/pg/startDb`, () => jest.fn())
const end = jest.fn()
const startDbValues = {
  db: { $config: { pgp: { end } } },
  pgp: {},
  ignoreError: {},
}
require("local/server/pg/startDb").mockReturnValue(startDbValues)
const pg = require("local/server/pg")
describe(`local/server/pg`, () => {
  it(`should re-export`, () => {
    expect(pg).toHaveProperty(`db`, startDbValues.db)
    expect(pg).toHaveProperty(`pgp`, startDbValues.pgp)
    expect(pg).toHaveProperty(`ignoreError`, startDbValues.ignoreError)
  })
  it(`should close the database`, () => {
    pg.closeDb()
    expect(end.mock.calls).toEqual([[]])
  })
})