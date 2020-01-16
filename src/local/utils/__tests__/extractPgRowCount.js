const extractPgRowCount = require("local/utils/extractPgRowCount")
describe(`local/utils/extractPgRowCount`, () => {
  it(`should extract the row count from the pg-promise result object`, () => {
    const rowCount = {}
    expect(extractPgRowCount({ rowCount })).toBe(rowCount)
  })
})