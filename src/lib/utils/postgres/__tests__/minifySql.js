import minifySql from "lib/utils/postgres/minifySql"
describe(`lib/utils/postgres/minifySql`, () => {
  it(`should utilize the dependency APIs correctly`, () => {
    expect(jestUtils.getDependencies([`pg-minify`])).toMatchSnapshot()
  })
  it(`should minify SQL queries`, () => {
    expect(minifySql(`
      SELECT * FROM my_table
      WHERE foo = $1
      LIMIT 20
    `)).toMatchSnapshot()
  })
})