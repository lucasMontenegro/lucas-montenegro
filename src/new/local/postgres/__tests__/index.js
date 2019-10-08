jest.mock(`new/local/postgres/startDb`, () => ({}))
const end = jest.fn()
const startDbValues = {
  db: {
    $config: { pgp: { end } },
  },
  pgp: {},
  ignoreError: {},
}
require("new/local/postgres/startDb").default = () => startDbValues
const postgres = require("new/local/postgres")
describe(`new/local/postgres`, () => {
  it(`should re-export`, () => {
    expect(postgres).toHaveProperty(`db`, startDbValues.db)
    expect(postgres).toHaveProperty(`pgp`, startDbValues.pgp)
    expect(postgres).toHaveProperty(`ignoreError`, startDbValues.ignoreError)
  })
  it(`should close the database`, () => {
    postgres.closeDb()
    expect(end.mock.calls).toEqual([[]])
  })
})