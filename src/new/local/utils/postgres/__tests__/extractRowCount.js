import extractRowCount from "new/local/utils/postgres/extractRowCount"
describe(`new/local/utils/postgres/extractRowCount`, () => {
  it(`should extract the row count from the pg-promise result object`, () => {
    const rowCount = {}
    expect(extractRowCount({ rowCount })).toBe(rowCount)
  })
})