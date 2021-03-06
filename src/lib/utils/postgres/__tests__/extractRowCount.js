import extractRowCount from "lib/utils/postgres/extractRowCount"
describe(`lib/utils/postgres/extractRowCount`, () => {
  it(`should use the right dependency versions`, () => {
    expect(jestUtils.getDependencies([`pg-promise`])).toMatchSnapshot()
  })
  it(`should extract the row count from the pg-promise result object`, () => {
    const rowCount = {}
    expect(extractRowCount({ rowCount })).toBe(rowCount)
  })
})